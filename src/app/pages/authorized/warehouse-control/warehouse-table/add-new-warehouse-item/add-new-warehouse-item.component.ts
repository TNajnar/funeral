import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { WarehouseService } from '@app/pages/authorized/warehouse-control/services/warehouse.service';
import {
  WarehouseTableGatewayService,
} from '@pages/authorized/warehouse-control/gateways/warehouse-table.gateway.service';
import { ButtonPrimaryComponent, ButtonSecondaryComponent } from '@app/ui';
import { resolveNewItemArgs } from '@app/pages/authorized/warehouse-control/lib/utils';
import type {
  TNewItemArgs, TWarehouseItem,
} from '@app/pages/authorized/warehouse-control/lib/warehouse-control.gateway.model';
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

  private _gateway: WarehouseTableGatewayService = inject(WarehouseTableGatewayService);
  private _warehouseService: WarehouseService = inject(WarehouseService);

  constructor() {
    this.selectItems = this._warehouseService.categories().map((value) => ({
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
        this._warehouseService.addWarehouseItem(newWarehouseItem);
      },
    });

    this.onCancel.emit();
    formData.reset();
  }

  protected _onCancel(): void {
    this.onCancel.emit();
  }
}
