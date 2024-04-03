import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Items } from 'src/app/shared/interface/Item';
import { Subject } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

interface DialogData {
  itemAdd$: Subject<Items>;
}

@Component({
  selector: 'app-item-add',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
    MatDatepickerModule,
  ],
  templateUrl: './item-add.component.html',
  styleUrl: './item-add.component.css',
})
export class ItemAddComponent {
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ItemAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  itemForm: any = this.formBuilder.group({
    name: [null, Validators.required],
    disc: [null, Validators.required],
    exp_date: [null, Validators.required],
    purchase_date: [null, Validators.required],
  });

  onNoClick(): void {
    this.dialogRef.close();
  }

  onUpdate() {
    if (this.itemForm.valid) {
      const payload: Items = this.itemForm.value;

      this.data.itemAdd$.next(payload);
      this.onNoClick();
    }
  }
}
