import { Component, HostBinding, inject, Input, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { WarehouseGatewayService } from '@app/pages/authorized/warehouse-control/gateways/warehouse-gateway.service';
import type { TWarehouseItem } from '@app/pages/authorized/warehouse-control/utils/warehouse-control.gateway.model';
import { warehouseControl } from '@lib/staticTexts';

@Component({
  selector: 'app-product-amount-change-menu',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './product-amount-change-menu.component.html',
  styleUrl: './product-amount-change-menu.component.css',
  host: {
    // eslint-disable-next-line max-len
    class: 'absolute top-8 right-4 z-10 flex-col gap-3 p-3 w-max text-sm bg-white rounded-md shadow-custom border border-gray-material2',
  },
})
export class ProductAmountChangeMenuComponent {
  protected _texts = warehouseControl.table.amountMenu;
  productAmount: number | undefined;

  @Input({ required: true }) product!: TWarehouseItem;
  isOpen = input.required<boolean>();
  onClose = output<void>();

  @HostBinding('class') get hostClasses(): string {
    return this.isOpen() ? 'flex' : 'hidden';
  }

  private _gateway: WarehouseGatewayService = inject(WarehouseGatewayService);

  onSubmit(): void {
    if (!this.productAmount) {
      return;
    }

    this._gateway.changeProductAmount(this.product.productId, this.productAmount).subscribe({
      next: (responseProduct: TWarehouseItem) => {
        this.product.inStock = responseProduct.inStock;
      },
      complete: () => {
        this.productAmount = undefined;
        this.handleClose();
      },
    });
  }

  handleClose(): void {
    this.productAmount = undefined;
    this.onClose.emit();
  }
}
