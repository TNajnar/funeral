import { Component, EventEmitter, inject, Output, Signal } from '@angular/core';

import { WarehouseTableService } from '@pages/authorized/warehouse-control/services/warehouse-table.service';
import { ECategoryModalVariants } from '@pages/authorized/warehouse-control/utils/enums';
import type { TCategory } from '@pages/authorized/warehouse-control/utils/warehouse-control.gateway.model';

@Component({
  selector: 'app-edit-categories',
  standalone: true,
  imports: [],
  templateUrl: './edit-categories.component.html',
})
export class EditCategoriesComponent {
  @Output() toggleModal = new EventEmitter<ECategoryModalVariants>();

  private _warehouseService: WarehouseTableService = inject(WarehouseTableService);

  categories: Signal<TCategory[]> = this._warehouseService.categories;

  handleToggleModal(): void {
    this.toggleModal.emit(ECategoryModalVariants.EditOrRemoveCategory);
  }
}
