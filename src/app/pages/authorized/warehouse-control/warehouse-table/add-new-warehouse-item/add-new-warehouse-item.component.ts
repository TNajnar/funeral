import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { WarehouseTableService } from '@pages/authorized/warehouse-control/services/warehouse-table.service';
import { WarehouseGatewayService } from '@pages/authorized/warehouse-control/gateways/warehouse-gateway.service';
import { ButtonPrimaryComponent, ButtonSecondaryComponent } from '@app/ui';
import { resolveNewItemArgs } from '@pages/authorized/warehouse-control/utils/utils';
import type {
  TNewItemArgs, TWarehouseItem
} from '@pages/authorized/warehouse-control/utils/warehouse-control.gateway.model';
import { warehouseControl } from '@lib/staticTexts';

interface ISelectItem {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-add-new-warehouse-item',
  standalone: true,
  // eslint-disable-next-line max-len
  imports: [FormsModule, ButtonSecondaryComponent, ButtonPrimaryComponent, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './add-new-warehouse-item.component.html',
})
export class AddNewWarehouseItemComponent {
  protected _texts = warehouseControl.newItemComponent;
  selectItems: ISelectItem[];

  @Output() onCancel = new EventEmitter<void>();

  private _gateway: WarehouseGatewayService = inject(WarehouseGatewayService);
  private _warehouseServiceTable: WarehouseTableService = inject(WarehouseTableService);

  constructor() {
    this.selectItems = this._warehouseServiceTable.categories().map((value) => ({
      value: value.id,
      viewValue: value.name,
    }));
  }

  protected _onSubmit(formData: NgForm): void {
    if (formData.form.invalid) {
      return;
    }

    const resolvedItemArgs: TNewItemArgs = resolveNewItemArgs(formData.value);

    this._gateway.addWarehouseItem(resolvedItemArgs).subscribe({
      next: (newWarehouseItem: TWarehouseItem): void => {
        this._warehouseServiceTable.addWarehouseItem(newWarehouseItem);
      },
    });

    this.onCancel.emit();
    formData.reset();
  }

  protected _onCancel(): void {
    this.onCancel.emit();
  }
}
