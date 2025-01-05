import { Component, Input, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatTabsModule } from '@angular/material/tabs';

import { ModalComponent } from '@app/ui/modal/modal.component';
import { StockInAmountTabComponent } from './stock-in-amount-tab/stock-in-amount-tab.component';
import { ChangeAmountTabComponent } from './change-amount-tab/change-amount-tab.component';
import type { TWarehouseItem } from '@app/pages/authorized/warehouse-control/utils/warehouse-control.gateway.model';
import { warehouseControl } from '@lib/staticTexts';

@Component({
  selector: 'app-product-amount-change-menu',
  standalone: true,
  imports: [FormsModule, ModalComponent, MatTabsModule, StockInAmountTabComponent, ChangeAmountTabComponent],
  templateUrl: './product-amount-change-menu.component.html',
})
export class ProductAmountChangeMenuComponent {
  protected _texts = warehouseControl.table.amountMenu;
  productAmount: number | undefined;

  @Input({ required: true }) product!: TWarehouseItem;
  isOpen = input.required<boolean>();
  onClose = output<void>();

  handleClose(): void {
    this.productAmount = undefined;
    this.onClose.emit();
  }
}
