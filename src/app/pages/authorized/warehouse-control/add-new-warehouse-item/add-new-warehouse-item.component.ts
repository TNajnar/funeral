import { Component, EventEmitter, inject, Output, ViewEncapsulation } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { WarehouseService } from '../warehouse.service';
import { ButtonPrimaryComponent } from '@app/ui/button-primary/button-primary.component';
import { ButtonSecondaryComponent } from '@app/ui/button-secondary/button-secondary.component';
import { warehouseControl } from '@lib/staticTexts';

@Component({
  selector: 'app-add-new-warehouse-item',
  standalone: true,
  // eslint-disable-next-line max-len
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, ButtonSecondaryComponent, ButtonPrimaryComponent],
  templateUrl: './add-new-warehouse-item.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [DatePipe],
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

    const formattedDate = this.datePipe.transform(formData.value.date, 'yyyy-MM-dd') || '';

    this.warehouseService.addWarehouseItem({
      coffinType: formData.value.wareItemType,
      comment: undefined,
      date: formattedDate,
      id: Math.floor(Math.random() * 1000),
      isFlagged: formData.value.isFlagged,
      name: formData.value.name,
      outcome: formData.value.outcome,
      profit: formData.value.profit,
    });

    this.onCancel.emit();
    formData.reset();
  }

  protected _onCancel(): void {
    this.onCancel.emit();
  }
}
