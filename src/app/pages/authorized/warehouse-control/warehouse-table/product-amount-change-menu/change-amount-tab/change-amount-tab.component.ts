import { Component, inject, Input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { WarehouseService } from '@pages/authorized/warehouse-control/services/warehouse.service';
import {
  WarehouseTableGatewayService,
} from '@pages/authorized/warehouse-control/gateways/warehouse-table.gateway.service';
import type { TWarehouseItem } from '@app/pages/authorized/warehouse-control/utils/warehouse-control.gateway.model';
import { warehouseControl } from '@lib/staticTexts';

@Component({
  selector: 'app-change-amount-tab',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './change-amount-tab.component.html',
  styleUrl: './change-amount-tab.component.css',
  host: { class: 'flex flex-col gap-4 pt-3 px-3 pb-1 mt-2 w-full text-sm' },
})
export class ChangeAmountTabComponent {
  protected _texts = warehouseControl.table.amountMenu.change;
  productAmount: number | undefined;

  @Input({ required: true }) product!: TWarehouseItem;
  onClose = output<void>();

  private _warehouseService: WarehouseService = inject(WarehouseService);
  private _gateway: WarehouseTableGatewayService = inject(WarehouseTableGatewayService);

  onSubmit(): void {
    if (!this.productAmount) {
      return;
    }

    this._gateway.changeProductAmount(this.product.productId, this.productAmount).subscribe({
      next: (responseProduct: TWarehouseItem) => {
        this.product.inStock = responseProduct.inStock;
        this._warehouseService.updateWarehouseCache();
      },
      complete: () => {
        this.handleClose();
      },
    });
  }

  handleClose(): void {
    this.productAmount = undefined;
    this.onClose.emit();
  }
}
