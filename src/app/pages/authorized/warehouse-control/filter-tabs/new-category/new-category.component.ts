import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { WarehouseService } from '@app/pages/authorized/warehouse-control/services/warehouse.service';
import { WarehouseGatewayService } from '@app/pages/authorized/warehouse-control/gateways/warehouse.gateway.service';
import { ButtonPrimaryComponent, ButtonSecondaryComponent } from '@app/ui';
import type { TCategory } from '@app/pages/authorized/warehouse-control/lib/warehouse-control.gateway.model';
import { ECategoryModalVariants } from '@app/pages/authorized/warehouse-control/lib/enums';
import { warehouseControl } from '@lib/staticTexts';

@Component({
  selector: 'app-new-category',
  standalone: true,
  imports: [FormsModule, ButtonSecondaryComponent, ButtonPrimaryComponent, MatFormFieldModule, MatInputModule],
  templateUrl: './new-category.component.html',
})
export class NewCategoryComponent {
  protected _texts = warehouseControl.filterTabs.newCategory;
  newCategoryName: string | undefined;

  @Output() toggleModal = new EventEmitter<ECategoryModalVariants>();

  private _warehouseService: WarehouseService = inject(WarehouseService);
  private _gateway: WarehouseGatewayService = inject(WarehouseGatewayService);

  get isMaxCategory(): boolean {
    return this._warehouseService.categories().length >= 6;
  }

  onSubmit(): void {
    if (!this.newCategoryName || this.isMaxCategory) {
      return;
    }

    this._gateway.createNewCategory(this.newCategoryName).subscribe({
      next: (newCategory: TCategory): void => {
        this._warehouseService.createNewCategory(newCategory);
      },
      complete: (): void => {
        this.newCategoryName = undefined;
        this.handleToggleModal();
      },
    });
  }

  handleToggleModal(): void {
    this.toggleModal.emit(ECategoryModalVariants.NewCategory);
  }
}
