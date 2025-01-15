import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import type { TWarehouseItem } from '@app/pages/authorized/warehouse-control/lib/warehouse-control.gateway.model';
import { AmountTabBaseComponent } from '../amount-tab-base/amount-tab-base.component';
import { AmountTabBaseTemplateComponent } from '../amount-tab-base/amount-tab-base-template.component';
import { warehouseControl } from '@lib/staticTexts';

@Component({
  selector: 'app-change-amount-tab',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatIconModule, MatTooltipModule, AmountTabBaseTemplateComponent],
  templateUrl: './change-amount-tab.component.html',
  styleUrl: './change-amount-tab.component.css',
})
export class ChangeAmountTabComponent extends AmountTabBaseComponent {
  @Input({ required: true }) product!: TWarehouseItem;
  @Output() onClose = new EventEmitter<void>();

  constructor() {
    super();
    this._texts = warehouseControl.table.amountMenu.change;
  }

  protected override _onSubmit(): void {
    if (!this._productAmount) {
      return;
    }

    this._gateway.changeProductAmount(this.product.productId, this._productAmount).subscribe({
      next: (responseProduct: TWarehouseItem) => {
        this.product.inStock = responseProduct.inStock;
        this._warehouseService.updateWarehouseData();
      },
      complete: () => {
        this._handleClose();
      },
    });
  }

  protected override _handleClose(): void {
    this._productAmount = undefined;
    this.onClose.emit();
  }
}
