import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { WarehouseService } from '../warehouse.service';

@Component({
  selector: 'app-add-new-warehouse-item',
  standalone: true,
  imports: [FormsModule, MatDialogActions, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './add-new-warehouse-item.component.html',
  providers: [DatePipe]
})
export class AddNewWarehouseItemComponent {
  @Output() onCancel = new EventEmitter<void>();

  warehouseService: WarehouseService = inject(WarehouseService);
  datePipe: DatePipe = inject(DatePipe);

  protected _onSubmit(formData: NgForm): void {
    if (formData.form.invalid) {
      return;
    }

    const currentDate = this.datePipe.transform(new Date(), 'dd.MM.yyyy');

    this.warehouseService.addWarehouseItem({
      id: 2 * 2,
      date: formData.value.date ? formData.value.date : currentDate,
      coffinType: formData.value.wareItemType,
      name: formData.value.name,
      profit: formData.value.profit,
      outcome: formData.value.outcome,
    });

    this.onCancel.emit();
    formData.reset();
  }

  protected _onCancel(): void {
    this.onCancel.emit();
  }
}
