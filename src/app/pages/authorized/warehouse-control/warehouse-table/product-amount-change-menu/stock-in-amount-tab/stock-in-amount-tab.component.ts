import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import type { TWarehouseItem } from '@app/pages/authorized/warehouse-control/utils/warehouse-control.gateway.model';
import { AmountTabBaseComponent } from '../amount-tab-base/amount-tab-base.component';
import { AmountTabBaseTemplateComponent } from '../amount-tab-base/amount-tab-base-template.component';
import { warehouseControl } from '@lib/staticTexts';

@Component({
  selector: 'app-stock-in-amount-tab',
  standalone: true,
  imports: [FormsModule, AmountTabBaseTemplateComponent, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './stock-in-amount-tab.component.html',
  styleUrl: './stock-in-amount-tab.component.css',
})
export class StockInAmountTabComponent extends AmountTabBaseComponent {
  @Input({ required: true }) product!: TWarehouseItem;
  @Output() onClose = new EventEmitter<void>();

  constructor() {
    super();
    this._texts = warehouseControl.table.amountMenu.stockIn;
  }

  protected override _onSubmit(): void {
    if (!this._productAmount) {
      return;
    }

    const parsedValue = Number(this._productAmount);

    if (isNaN(parsedValue)) {
      this._errorService.showError(this._texts.error);
      return;
    }

    this._gateway.stockUpProduct(this.product.productId, parsedValue).subscribe({
      next: (responseWarehouseItem: TWarehouseItem): void => {
        this.product.inStock = responseWarehouseItem.inStock;
        this._warehouseService.updateWarehouseCache();
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
