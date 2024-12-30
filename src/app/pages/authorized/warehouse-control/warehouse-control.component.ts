import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { WarehouseTableService } from './services/warehouse-table.service';
import { WarehouseGatewayService } from './gateways/warehouse-gateway.service';
import { WarehouseCacheService } from './services/warehouse-cache.service';
import { WarehouseTableComponent } from './warehouse-table/warehouse-table.component';
import {
  AddNewWarehouseItemComponent
} from './warehouse-table/add-new-warehouse-item/add-new-warehouse-item.component';
import { FilterTabsComponent } from './filter-tabs/filter-tabs.component';
import { ButtonSecondaryComponent, ModalComponent } from '@app/ui';
import { GraphComponent } from '@app/shared/graph/graph.component';
import type { TCategory, TWarehouseItem } from './utils/warehouse-control.gateway.model';
import { warehouseControl } from '@lib/staticTexts';

@Component({
  selector: 'app-warehouse-control',
  standalone: true,
  imports: [FormsModule,
    AddNewWarehouseItemComponent, ModalComponent, ButtonSecondaryComponent, WarehouseTableComponent, GraphComponent,
    MatIconModule, MatFormFieldModule, MatInputModule, FilterTabsComponent,
  ],
  templateUrl: './warehouse-control.component.html',
})
export class WarehouseControlComponent implements OnInit {
  protected _texts = warehouseControl;
  isModalOpen = signal<boolean>(false);

  private _warehouseServiceTable: WarehouseTableService = inject(WarehouseTableService);
  private _gateway: WarehouseGatewayService = inject(WarehouseGatewayService);
  private _cacheService: WarehouseCacheService = inject(WarehouseCacheService);
  private _destroyRef: DestroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const cachedWarehouse = this._cacheService.getStorageData();

    if (cachedWarehouse) {
      const storedWarehouse: TWarehouseItem[] = cachedWarehouse.warehouseItems;
      const storedCategories: TCategory[] = cachedWarehouse.categories;

      this._warehouseServiceTable.notifyWarehouseItemsChange$(storedWarehouse);
      this._warehouseServiceTable.setCategories(storedCategories);
      return;
    }

    this._loadData();
  }

  private _loadData(): void {
    this._warehouseServiceTable.isLoading.set(true);

    const subscription = this._gateway.loadCacheableData().subscribe({
      next: ([warehouseItems, categories]): void => {
        this._warehouseServiceTable.notifyWarehouseItemsChange$(warehouseItems.products);
        this._warehouseServiceTable.setCategories(categories.productCategories);
        this._cacheService.saveToStorage({
          categories: categories.productCategories,
          warehouseItems: warehouseItems.products,
        });
      },
      complete: (): void => this._warehouseServiceTable.isLoading.set(false),
    });

    this._destroyRef.onDestroy((): void =>
      subscription.unsubscribe()
    );
  }

  toggleModal(): void {
    this.isModalOpen.set(!this.isModalOpen());
  }

  onSearchQueryChange(value: string): void {
    this._warehouseServiceTable.filterOptions.searchText = value.trim().toLowerCase();
    this._warehouseServiceTable.updateTableFilters();
  }
}
