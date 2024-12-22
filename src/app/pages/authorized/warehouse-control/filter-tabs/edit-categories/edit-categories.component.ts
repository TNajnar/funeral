import { Component, EventEmitter, inject, Output, Signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { WarehouseTableService } from '@pages/authorized/warehouse-control/services/warehouse-table.service';
import { ButtonPrimaryComponent, ButtonSecondaryComponent } from '@app/ui';
import { ECategoryModalVariants } from '@pages/authorized/warehouse-control/utils/enums';
import { _CATEGORY_COLUMNS } from '@pages/authorized/warehouse-control/utils/consts';
import type { TCategory } from '@pages/authorized/warehouse-control/utils/warehouse-control.gateway.model';
import { warehouseControl } from '@lib/staticTexts';

@Component({
  selector: 'app-edit-categories',
  standalone: true,
  imports: [FormsModule, MatIconModule, MatTableModule, ButtonSecondaryComponent, ButtonPrimaryComponent],
  templateUrl: './edit-categories.component.html',
  host: { class: 'flex flex-col gap-4' }
})
export class EditCategoriesComponent {
  protected _texts = warehouseControl.filterTabs.editCategory;
  dataSource = new MatTableDataSource();

  @Output() toggleModal = new EventEmitter<ECategoryModalVariants>();

  private _warehouseService: WarehouseTableService = inject(WarehouseTableService);

  categories: Signal<TCategory[]> = this._warehouseService.categories;

  get displayedColumns(): string[] {
    return _CATEGORY_COLUMNS;
  }

  get tableData(): TCategory[] {
    return this.dataSource.data = this.categories();
  }

  onSubmit(formData: NgForm): void {
    if (formData.invalid) {
      return;
    }

    // TODO
    this.handleToggleModal();
  }

  handleToggleModal(): void {
    this.toggleModal.emit(ECategoryModalVariants.EditOrRemoveCategory);
  }
}
