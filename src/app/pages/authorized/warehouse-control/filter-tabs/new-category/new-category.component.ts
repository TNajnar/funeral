import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { WarehouseTableService } from '@pages/authorized/warehouse-control/services/warehouse-table.service';
import { WarehouseGatewayService } from '@pages/authorized/warehouse-control/gateways/warehouse-gateway.service';
import { ButtonPrimaryComponent, ButtonSecondaryComponent } from '@app/ui';
import type { TCategory } from '@pages/authorized/warehouse-control/utils/warehouse-control.gateway.model';
import { ECategoryModalVariants } from '@pages/authorized/warehouse-control/utils/enums';
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

  private _warehouseService: WarehouseTableService = inject(WarehouseTableService);
  private _gateway: WarehouseGatewayService = inject(WarehouseGatewayService);

  onSubmit(): void {
    if (!this.newCategoryName) {
      return;
    }

    this._gateway.createNewCategory(this.newCategoryName).subscribe({
      next: (newCategory: TCategory): void => {
        this._warehouseService.createNewCategory(newCategory);
      },
      complete: () => {
        this.newCategoryName = undefined;
        this.handleToggleModal();
      },
    });
  }

  handleToggleModal(): void {
    this.toggleModal.emit(ECategoryModalVariants.NewCategory);
  }
}
