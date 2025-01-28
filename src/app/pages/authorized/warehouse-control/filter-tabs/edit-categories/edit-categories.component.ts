import { Component, EventEmitter, inject, OnInit, Output, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { WarehouseService } from '@app/pages/authorized/warehouse-control/services/warehouse.service';
import { WarehouseGatewayService } from '@app/pages/authorized/warehouse-control/gateways/warehouse.gateway.service';
import { ButtonPrimaryComponent, ButtonSecondaryComponent } from '@app/ui';
import { ECategoryModalVariants } from '@app/pages/authorized/warehouse-control/lib/enums';
import { _CATEGORY_COLUMNS } from '@app/pages/authorized/warehouse-control/lib/consts';
import type { TCategory } from '@app/pages/authorized/warehouse-control/lib/warehouse-control.gateway.model';
import { warehouseControl } from '@lib/staticTexts';

type TTempCategories = {
  categories: Record<number, string>;
  removed: Record<number, string>;
}

@Component({
  selector: 'app-edit-categories',
  standalone: true,
  imports: [FormsModule, MatIconModule, MatTableModule, ButtonSecondaryComponent, ButtonPrimaryComponent],
  templateUrl: './edit-categories.component.html',
  host: { class: 'flex flex-col gap-4' },
})
export class EditCategoriesComponent implements OnInit {
  protected _texts = warehouseControl.filterTabs.editCategory;
  dataSource = new MatTableDataSource();
  tempCategories!: TTempCategories;

  @Output() toggleModal = new EventEmitter<ECategoryModalVariants>();

  private _warehouseService: WarehouseService = inject(WarehouseService);
  private _gateway: WarehouseGatewayService = inject(WarehouseGatewayService);

  categories: Signal<TCategory[]> = this._warehouseService.categories;

  ngOnInit(): void {
    this._initializeTempCategories();
  }

  get displayedColumns(): readonly string[] {
    return _CATEGORY_COLUMNS;
  }

  get editableCategories(): TCategory[] {
    return this.categories().slice(1); // Return without All item
  }

  get tableData(): TCategory[] {
    return this.dataSource.data = this.editableCategories.filter(category =>
      !(category.id in this.tempCategories.removed)
    );
  }

  updateTempCategory(newName: string, categoryId: number): void {
    if (this.tempCategories.categories[categoryId]) {
      this.tempCategories.categories[categoryId] = newName;
    }
  }

  isChanged(): boolean {
    const isRenamed = Object.entries(this.tempCategories.categories).some(([id, newName]) => {
      const category = this.editableCategories.find(cat => cat.id === +id);
      return category && category.name !== newName;
    });

    const isRemoved = Object.keys(this.tempCategories.removed).length > 0;

    return isRenamed || isRemoved;
  }

  removeTempCategory(categoryId: number): void {
    if (this.tempCategories.categories[categoryId]) {
      this.tempCategories.removed[categoryId] = this.tempCategories.categories[categoryId];
      delete this.tempCategories.categories[categoryId];
    }
  }

  onSubmit(): void {
    Object.entries(this.tempCategories.categories).forEach(([id, name]) => {
      const category = this.categories().find(cat => cat.id === +id);
      if (category && category.name !== name) {
        this._renameCategory(name, category);
      }
    });

    if (this.tempCategories.removed) {
      Object.keys(this.tempCategories.removed).forEach(id =>
        this._deleteCategory(+id)
      );
    }

    this.handleToggleModal();
  }

  handleToggleModal(): void {
    this.toggleModal.emit(ECategoryModalVariants.EditOrRemoveCategory);
  }

  private _initializeTempCategories(): void {
    this.tempCategories = {
      categories: {},
      removed: {},
    };

    for (const category of this.editableCategories) {
      this.tempCategories.categories[category.id] = category.name;
    }
  }

  private _renameCategory(newCategoryName: string, category: TCategory): void {
    this._gateway.renameCategory(category.id, newCategoryName).subscribe({
      next: (responseCategory: TCategory): void => {
        category.name = responseCategory.name;
      },
      complete: () => this._warehouseService.notifyCategoryChange$(true),
    });
  }

  private _deleteCategory(categoryId: number): void {
    this._gateway.deleteCategory(categoryId).subscribe({
      next: (): void => {
        this._warehouseService.deleteCategory(categoryId);
      },
      complete: () => this._warehouseService.notifyCategoryChange$(true),
    });
  }
}
