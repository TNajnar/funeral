import { Component, ElementRef, HostListener, inject, Signal, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { WarehouseService } from '../services/warehouse.service';
import { NewCategoryComponent } from './new-category/new-category.component';
import { EditCategoriesComponent } from './edit-categories/edit-categories.component';
import { ModalComponent } from '@app/ui';
import { CATEGORY_MENU_ITEMS } from '../utils/consts';
import type { TCategory } from '../utils/warehouse-control.gateway.model';
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
  },
})
export class FilterTabsComponent {
  protected _texts = warehouseControl.filterTabs;
  protected _EModalVariants = ECategoryModalVariants;
  isMenuOpen = signal<boolean>(false);
  isModalOpen = signal<TCategoryModals>({
    [ECategoryModalVariants.EditOrRemoveCategory]: false,
    [ECategoryModalVariants.NewCategory]: false,
  });

  private _warehouseService: WarehouseService = inject(WarehouseService);
  private _elementRef: ElementRef = inject(ElementRef);

  categories: Signal<TCategory[]> = this._warehouseService.categories;

  activeTab: Signal<number> = this._warehouseService.activeTab;

  get categoryMenuItems(): TCategoryMenuItem[] {
    return CATEGORY_MENU_ITEMS;
  }

  onTabClick(productCategory: TCategory): void {
    if (this.isMenuOpen()) {
      this.isMenuOpen.set(false);
    }

    this._warehouseService.setActiveTab(productCategory.id);
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

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: MouseEvent): void {
    const targetElement = event.target as HTMLElement;

    if (this.isMenuOpen && !this._elementRef.nativeElement.contains(targetElement)) {
      this.isMenuOpen.set(false);
    }
  }
}
