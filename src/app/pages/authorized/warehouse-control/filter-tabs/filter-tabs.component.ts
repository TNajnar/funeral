import { Component, DestroyRef, inject, OnInit, Signal, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { WarehouseTableService } from '../services/warehouse-table.service';
import { WarehouseGatewayService } from '../gateways/warehouse-gateway.service';
import { NewCategoryComponent } from './new-category/new-category.component';
import { EditCategoriesComponent } from './edit-categories/edit-categories.component';
import { ModalComponent } from '@app/ui';
import { CATEGORY_MENU_ITEMS, STATIC_CATEGORY_ITEM } from '../utils/consts';
import type { TCategories, TCategory } from '../utils/warehouse-control.gateway.model';
import type { TCategoryMenuItem, TCategoryModals } from '../utils/warehouse-control.model';
import { ECategoryModalVariants } from '../utils/enums';
import { warehouseControl } from '@lib/staticTexts';
import { WarehouseCacheService } from '../services/warehouse-cache.service';

@Component({
  selector: 'app-filter-tabs',
  standalone: true,
  imports: [NgClass, ModalComponent, MatIconModule, NewCategoryComponent, EditCategoriesComponent],
  styleUrls: ['./filter-tabs.component.css'],
  templateUrl: './filter-tabs.component.html',
  host: {
    class: 'flex items-center mt-auto w-[650px] h-fit-content',
  }
})
export class FilterTabsComponent implements OnInit {
  protected _texts = warehouseControl.filterTabs;
  protected _EModalVariants = ECategoryModalVariants;
  activeTab = signal<number>(STATIC_CATEGORY_ITEM.id);
  isMenuOpen = signal<boolean>(false);
  isModalOpen = signal<TCategoryModals>({
    [ECategoryModalVariants.EditOrRemoveCategory]: false,
    [ECategoryModalVariants.NewCategory]: false,
  });
  isLoading = signal<boolean>(false);

  private _warehouseService: WarehouseTableService = inject(WarehouseTableService);
  private _gateway: WarehouseGatewayService = inject(WarehouseGatewayService);
  private _cacheService: WarehouseCacheService = inject(WarehouseCacheService);
  private _destroyRef: DestroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const cachedWarehouse = this._cacheService.getStorageData();

    if (cachedWarehouse?.categories) {
      const storedCategories: TCategory[] = cachedWarehouse.categories;
      this._warehouseService.setCategories(storedCategories);
      return;
    }

    this._loadData();
  }

  categories: Signal<TCategory[]> = this._warehouseService.categories;

  get categoryMenuItems(): TCategoryMenuItem[] {
    return CATEGORY_MENU_ITEMS;
  }

  private _loadData(): void {
    this.isLoading.set(true);

    const subscription = this._gateway.fetchCategories().subscribe({
      next: (categories: TCategories): void => {
        this._warehouseService.setCategories(categories.productCategories);
        // TODO
        // this._cacheService.saveToStorage({
        //   ...this._cacheService.warehouseCache,
        //   categories: this.categories()
        // });
      },
      complete: (): void => this.isLoading.set(false)
    });

    this._destroyRef.onDestroy((): void => {
      subscription.unsubscribe();
    });
  }

  onTabClick(productCategory: TCategory): void {
    if (this.isMenuOpen()) {
      this.isMenuOpen.set(false);
    }

    this.activeTab.set(productCategory.id);
    this._warehouseService.filterOptions.productCategory = productCategory.name;
    this._warehouseService.updateTableFilters();
  }

  toggleMenu(): void {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  onMenuItemClick(item: TCategoryMenuItem): void {
    this.toggleMenu();
    this.handleModalVariantOpen(item.variant);
    this.toggleModal(item.variant);
  }

  toggleModal(variant: ECategoryModalVariants): void {
    this.isModalOpen.update(prevState => ({
      ...prevState,
      [variant]: !this.isModalOpen()[variant],
    }));
  }

  handleModalVariantOpen(modalVariant: ECategoryModalVariants): boolean {
    return this.isModalOpen()[modalVariant];
  }
}
