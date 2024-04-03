import { Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  query,
  where,
} from '@angular/fire/firestore';
import { convertTimestamps } from 'convert-firebase-timestamp';
import {
  Observable,
  Subject,
  defer,
  exhaustMap,
  filter,
  map,
  retry,
} from 'rxjs';
import { AuthService } from 'src/app/shared/data-access/auth.service';
import { Items } from 'src/app/shared/interface/Item';

interface itemState {
  items: Items[];
  error: string | null;
}
@Injectable({
  providedIn: 'root',
})
export class ItemDataService {
  private firestore = inject(Firestore);
  private authService = inject(AuthService);
  private authUser$ = toObservable(this.authService.user);

  items$ = this.getItems().pipe(
    retry({
      delay: () => this.authUser$.pipe(filter((user) => !!user)),
    })
  );
  update$ = new Subject<Items>();
  error$ = new Subject<string>();
  logout$ = this.authUser$.pipe(filter((user) => !user));

  // state
  private state = signal<itemState>({
    items: [],
    error: null,
  });

  // selectors
  items = computed(() => this.state().items);
  error = computed(() => this.state().error);

  constructor() {
    this.items$.pipe(takeUntilDestroyed()).subscribe((items) =>
      this.state.update((state) => ({
        ...state,
        items,
      }))
    );

    this.update$
      .pipe(
        takeUntilDestroyed(),
        exhaustMap((item) => this.updateItems(item))
      )
      .subscribe({
        error: (err) => {
          console.log(err);
          this.error$.next('Failed to add Item');
        },
      });

    this.logout$
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.state.update((state) => ({ ...state, items: [] })));

    this.error$
      .pipe(takeUntilDestroyed())
      .subscribe((error) =>
        this.state.update((state) => ({ ...state, error }))
      );
  }

  private getItems() {
    const uid = this.authService.user()?.uid;

    const itemCollection = query(
      collection(this.firestore, 'items'),
      where('uid', '==', uid)
    );

    return collectionData(itemCollection).pipe(
      map((obj) => {
        return obj.map((e) => {
          return convertTimestamps(e);
        });
      })
    ) as Observable<Items[]>;
  }

  private updateItems(item: Items) {
    const payload: Items = {
      ...item,
      uid: this.authService.user()?.uid,
      created_at: new Date(),
    };

    const itemCollection = collection(this.firestore, 'items');
    return defer(() => addDoc(itemCollection, payload));
  }

}
