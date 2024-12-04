import { Component, DestroyRef, inject, OnInit, Signal, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { WarehouseTableService } from '../services/warehouse-table.service';
import { WarehouseGatewayService } from '../gateways/warehouse-gateway.service';
import { NewCategoryComponent } from './new-category/new-category.component';
import { EditCategoriesComponent } from './edit-categories/edit-categories.component';
import { ModalComponent } from '@app/ui/modal/modal.component';
import { CATEGORY_MENU_ITEMS } from '../utils/consts';
import type { TCategories, TCategory } from '../utils/warehouse-control.gateway.model';
import type { TCategoryMenuItem, TCategoryModals } from '../utils/warehouse-control.model';
import { ECategoryModalVariants } from '../utils/enums';
import { warehouseControl } from '@lib/staticTexts';

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
  activeTab = signal<number>(4);
  isMenuOpen = signal<boolean>(false);
  protected _EModalVariants = ECategoryModalVariants;
  isModalOpen = signal<TCategoryModals>({
    [ECategoryModalVariants.EditOrRemoveCategory]: false,
    [ECategoryModalVariants.NewCategory]: false,
  });

  private _warehouseService: WarehouseTableService = inject(WarehouseTableService);
  private _gateway: WarehouseGatewayService = inject(WarehouseGatewayService);
  private _destroyRef: DestroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const subscription = this._gateway.fetchCategories().subscribe({
      next: (categories: TCategories): void => {
        this._warehouseService.setCategories([
          categories.productCategories[3],
          categories.productCategories[4],
          categories.productCategories[5],
        ]); // TODO
      },
    });

    this._destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  categories: Signal<TCategory[]> = this._warehouseService.categories;

  get categoryMenuItems(): TCategoryMenuItem[] {
    return CATEGORY_MENU_ITEMS;
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
