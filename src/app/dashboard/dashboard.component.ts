import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/shared/data-access/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Items } from '../shared/interface/Item';
import { ItemDataService } from './data-access/item-data.service';
import { NavbarComponent } from './ui/navbar/navbar.component';
import { ItemAddComponent } from './ui/item-add/item-add.component';
import { ItemDisplayComponent } from './ui/item-display/item-display.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    ItemAddComponent,
    ItemDisplayComponent,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  public authService = inject(AuthService);
  private router = inject(Router);
  public itemData$ = inject(ItemDataService);

  data$: Observable<Items[]> | undefined;

  constructor(public dialog: MatDialog) {
    effect(() => {
      if (!this.authService.user()) {
        this.router.navigate(['home']);
      }
    });
  }

  openDialog(): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const dialogRef = this.dialog.open(ItemAddComponent, {
      data: { itemAdd$: this.itemData$.update$ },
    });
  }
}
