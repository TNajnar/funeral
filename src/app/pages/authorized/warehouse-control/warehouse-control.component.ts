import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { WarehouseService } from './services/warehouse.service';
import { WarehouseGatewayService } from './gateways/warehouse.gateway.service';
import { WarehouseCacheService } from './services/warehouse-cache.service';
import { WarehouseTableComponent } from './warehouse-table/warehouse-table.component';
import {
  AddNewWarehouseItemComponent,
} from './warehouse-table/add-new-warehouse-item/add-new-warehouse-item.component';
import { FilterTabsComponent } from './filter-tabs/filter-tabs.component';
import { WarehouseGraphComponent } from './warehouse-graph/warehouse-graph.component';
import { ButtonSecondaryComponent, ModalComponent, IconComponent } from '@app/ui';
import { warehouseControl } from '@lib/staticTexts';

@Component({
  selector: 'app-warehouse-control',
  standalone: true,
  imports: [FormsModule,
    AddNewWarehouseItemComponent, ModalComponent, ButtonSecondaryComponent, WarehouseTableComponent,
    IconComponent, MatFormFieldModule, MatInputModule, FilterTabsComponent, WarehouseGraphComponent,
  ],
  templateUrl: './warehouse-control.component.html',
  host: { class: 'min-w-1192 whitespace-nowrap' },
})
export class WarehouseControlComponent implements OnInit {
  protected _texts = warehouseControl;
  isModalOpen = signal<boolean>(false);

  private _warehouseService: WarehouseService = inject(WarehouseService);
  private _gateway: WarehouseGatewayService = inject(WarehouseGatewayService);
  private _cacheService: WarehouseCacheService = inject(WarehouseCacheService);
  private _destroyRef: DestroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this._warehouseService.onCategoryChange$.subscribe((hasChanged) => {
      if (hasChanged) {
        this._loadData();
        this._warehouseService.notifyCategoryChange$(false);
        return;
      }
    });

    const cachedWarehouse = this._cacheService.getStorageData();

    if (cachedWarehouse?.categories.length && cachedWarehouse?.warehouseItems.length) {
      const { categories, warehouseItems, tablePagination } = cachedWarehouse;

      this._warehouseService.setWarehouseData(categories, warehouseItems, tablePagination);
      return;
    }

    this._loadData();
  }

  private _loadData(): void {
    this._warehouseService.isLoading.set(true);

    const subscription = this._gateway.loadCacheableData().subscribe({
      next: ([warehouseItems, categories]): void => {
        this._warehouseService.setWarehouseData(categories.productCategories, warehouseItems.products);
      },
      complete: (): void => this._warehouseService.isLoading.set(false),
    });

    this._destroyRef.onDestroy((): void =>
      subscription.unsubscribe()
    );
  }

  toggleModal(): void {
    this.isModalOpen.set(!this.isModalOpen());
  }

  onSearchQueryChange(value: string): void {
    this._warehouseService.filterOptions.searchText = value.trim().toLowerCase();
    this._warehouseService.updateTableFilters();
  }
}
