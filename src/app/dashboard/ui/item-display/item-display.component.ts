import { Component, Input, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { Items } from 'src/app/shared/interface/Item';

@Component({
  selector: 'app-item-display',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatTableModule],
  templateUrl: './item-display.component.html',
  styleUrl: './item-display.component.css',
})
export class ItemDisplayComponent {
  itemDataSignal = signal<Items[]>([]);
  @Input({ required: true }) set itemData(value: Items[]) {
    this.itemDataSignal.set(value);
  }

  displayedColumns: string[] = ['name', 'disc', 'purchase_date', 'exp_date'];
  dataSource: Items[] | undefined = undefined;

  constructor() {
    effect(() => {
      if (this.itemDataSignal().length > 0) {
        this.dataSource = this.itemDataSignal();
      } else this.dataSource = undefined;
    });
  }
}
