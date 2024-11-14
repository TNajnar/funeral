import { Component, EventEmitter, inject, Output, ViewEncapsulation } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { WarehouseService } from '../warehouse.service';
import { warehouseControl } from '@lib/staticTexts';
import { ButtonPrimaryComponent } from '@app/ui/button-primary/button-primary.component';
import { ButtonSecondaryComponent } from '@app/ui/button-secondary/button-secondary.component';

@Component({
  selector: 'app-add-new-warehouse-item',
  standalone: true,
  // eslint-disable-next-line max-len
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, ButtonSecondaryComponent, ButtonPrimaryComponent],
  templateUrl: './add-new-warehouse-item.component.html',
  providers: [DatePipe],
  encapsulation: ViewEncapsulation.None,
})
export class AddNewWarehouseItemComponent {
  @Output() onCancel = new EventEmitter<void>();

  protected _texts = warehouseControl.newItemComponent;

  warehouseService: WarehouseService = inject(WarehouseService);
  datePipe: DatePipe = inject(DatePipe);

  protected _onSubmit(formData: NgForm): void {
    if (formData.form.invalid) {
      return;
    }

    const selectedDate = formData.value.date ? new Date(formData.value.date) : new Date();
    const currentDate = this.datePipe.transform(selectedDate, 'dd.MM.yyyy') || '';

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
