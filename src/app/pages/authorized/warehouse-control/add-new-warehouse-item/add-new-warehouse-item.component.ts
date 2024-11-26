import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';

import { WarehouseTableService } from '../services/warehouse-table.service';
import { ButtonPrimaryComponent } from '@app/ui/button-primary/button-primary.component';
import { ButtonSecondaryComponent } from '@app/ui/button-secondary/button-secondary.component';
import { ETabVariants } from '../warehouse-control.model';
import { warehouseControl } from '@lib/staticTexts';

interface IItemType {
  value: string;
  viewValue: string;
}

const enumToCs: Record<ETabVariants, string> = {
  [ETabVariants.All]: 'Vše',
  [ETabVariants.Coffin]: 'Rakve',
  [ETabVariants.Urns]: 'Urna',
  [ETabVariants.Flowers]: 'Kytky',
};

const itemTypes: IItemType[] = Object.values(ETabVariants).map((value) => ({
  value: value,
  viewValue: enumToCs[value],
}));

@Component({
  selector: 'app-add-new-warehouse-item',
  standalone: true,
  // eslint-disable-next-line max-len
  imports: [FormsModule, ButtonSecondaryComponent, ButtonPrimaryComponent, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule],
  templateUrl: './add-new-warehouse-item.component.html',
  providers: [DatePipe],
})
export class AddNewWarehouseItemComponent {
  protected _texts = warehouseControl.newItemComponent;
  itemTypes: IItemType[] = itemTypes;

  @Output() onCancel = new EventEmitter<void>();

  _warehouseServiceTable: WarehouseTableService = inject(WarehouseTableService);
  datePipe: DatePipe = inject(DatePipe);

  protected _onSubmit(formData: NgForm): void {
    if (formData.form.invalid) {
      return;
    }

    const formattedDate = this.datePipe.transform(formData.value.date || new Date(), 'yyyy-MM-dd') || '';

    this._warehouseServiceTable.addWarehouseItem({
      availableCount: formData.value.availableCount,
      comment: undefined,
      date: formattedDate,
      id: Math.floor(Math.random() * 1000),
      isFlagged: formData.value.isFlagged,
      name: formData.value.name,
      tabType: formData.value.itemType,
    });

    this.onCancel.emit();
    formData.reset();
  }

  protected _onCancel(): void {
    this.onCancel.emit();
  }
}
