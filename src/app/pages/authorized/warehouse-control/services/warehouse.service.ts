import { inject, Injectable, Signal, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

import { WarehouseTableFiltersService } from './warehouse-table-filters.service';
import { WarehouseCacheService } from './warehouse-cache.service';
import type { TFilterOptions } from '../utils/warehouse-control.model';
import type { TCategory, TWarehouseItem } from '../utils/warehouse-control.gateway.model';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {
  private _warehouseItems$ = new BehaviorSubject<TWarehouseItem[]>([]);
  private _onCategoryChange$ = new BehaviorSubject<boolean>(false);
  private _tableDataSource = new MatTableDataSource<TWarehouseItem>();
  private _categories = signal<TCategory[]>([]);
  isLoading = signal<boolean>(false);

  private _warehouseTableFilters: WarehouseTableFiltersService = inject(WarehouseTableFiltersService);
  private _cacheService: WarehouseCacheService = inject(WarehouseCacheService);

  constructor() {
    this._tableDataSource.filterPredicate = this._warehouseTableFilters._createFilterPredicate();
  }

  get warehouseItems$(): Observable<TWarehouseItem[]> {
    return this._warehouseItems$.asObservable();
  }

  get tableDataSource(): MatTableDataSource<TWarehouseItem> {
    return this._tableDataSource;
  }

  get filterOptions(): TFilterOptions {
    return this._warehouseTableFilters.filterOptions;
  }

  categories: Signal<TCategory[]> = this._categories.asReadonly();

  get onCategoryChange$(): Observable<boolean> {
    return this._onCategoryChange$.asObservable();
  }

  updateWarehouseCache(): void {
    this._cacheService.saveToStorage({
      categories: this._categories(),
      warehouseItems: this._warehouseItems$.getValue(),
    });
  }

  notifyWarehouseItemsChange$(warehouseItems: TWarehouseItem[]): void {
    this._warehouseItems$.next(warehouseItems);
    this._tableDataSource.data = this._warehouseItems$.getValue();
  }

  notifyCategoryChange$(value: boolean): void {
    return this._onCategoryChange$.next(value);
  }

  addWarehouseItem(warehouseItem: TWarehouseItem): void {
    const currentItems = this._warehouseItems$.getValue();
    this.notifyWarehouseItemsChange$([warehouseItem, ...currentItems]);
    this.updateWarehouseCache();
  }

  deleteWarehouseItem(productId: number): void {
    const updatedItems = this._warehouseItems$.getValue().filter((warehouseItem) =>
      warehouseItem.productId !== productId
    );
    this.notifyWarehouseItemsChange$(updatedItems);
    this.updateWarehouseCache();
  }

  updateTableFilters(): void {
    this._tableDataSource.filter = JSON.stringify(this.filterOptions);
  }

  setCategories(newCategories: TCategory[]): void {
    this._categories.set(newCategories);
    this.updateWarehouseCache();
  }

  createNewCategory(newCategory: TCategory): void {
    this._categories.set([...this._categories(), newCategory]);
    this.updateWarehouseCache();
  }

  deleteCategory(categoryId: number): void {
    this._categories.update(prevState => prevState.filter(category => category.id !== categoryId));
    this.updateWarehouseCache();
  }
}
