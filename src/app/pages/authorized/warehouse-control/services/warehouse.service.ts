import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

import { WarehouseTableFiltersService } from './warehouse-table-filters.service';
import { WarehouseCacheService } from './warehouse-cache.service';
import type { TFilterOptions } from '../utils/warehouse-control.model';
import type { TCategory, TWarehouseItem } from '../utils/warehouse-control.gateway.model';
import { STATIC_CATEGORY_ITEM } from '../utils/consts';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {
  private _warehouseItems$ = new BehaviorSubject<TWarehouseItem[]>([]);
  private _onWarehouseTableChange$ = new BehaviorSubject<boolean>(false);
  private _onCategoryChange$ = new BehaviorSubject<boolean>(false);
  private _tableDataSource = new MatTableDataSource<TWarehouseItem>();
  private _categories = signal<TCategory[]>([]);
  private _activeTab = signal<number>(STATIC_CATEGORY_ITEM.id);
  isLoading = signal<boolean>(false);

  private _warehouseTableFilters = inject(WarehouseTableFiltersService);
  private _cacheService = inject(WarehouseCacheService);

  constructor() {
    this._initializeTable();
  }

  categories = this._categories.asReadonly();
  activeTab = this._activeTab.asReadonly();

  get warehouseItems$(): Observable<TWarehouseItem[]> {
    return this._warehouseItems$.asObservable();
  }

  get onWarehouseTableChange$(): Observable<boolean> {
    return this._onWarehouseTableChange$.asObservable();
  }

  get tableDataSource(): MatTableDataSource<TWarehouseItem> {
    return this._tableDataSource;
  }

  get filterOptions(): TFilterOptions {
    return this._warehouseTableFilters.filterOptions;
  }

  get onCategoryChange$(): Observable<boolean> {
    return this._onCategoryChange$.asObservable();
  }

  updateWarehouseData(): void {
    this._notifyWarehouseItemsChange$();
    this._updateCache();
  }

  addWarehouseItem(item: TWarehouseItem): void {
    this.updateWarehouseItems([item, ...this._warehouseItems$.getValue()]);
  }

  deleteWarehouseItem(productId: number): void {
    const updatedItems = this._warehouseItems$.getValue().filter(item => item.productId !== productId);
    this.updateWarehouseItems(updatedItems);
  }

  updateWarehouseItems(items: TWarehouseItem[]): void {
    this._warehouseItems$.next(items);
    this._tableDataSource.data = items;
    this._notifyWarehouseItemsChange$();
    this._updateCache();
  }

  setCategories(newCategories: TCategory[]): void {
    this._categories.set(newCategories);
    this._updateCache();
  }

  createNewCategory(newCategory: TCategory): void {
    this._categories.set([...this._categories(), newCategory]);
    this._updateCache();
  }

  notifyCategoryChange$(value: boolean): void {
    return this._onCategoryChange$.next(value);
  }

  deleteCategory(categoryId: number): void {
    this._categories.update(categories => categories.filter(category => category.id !== categoryId));
    this._updateCache();
  }

  setActiveTab(tabId: number): void {
    this._activeTab.set(tabId);
  }

  updateTableFilters(): void {
    this._tableDataSource.filter = JSON.stringify(this.filterOptions);
  }

  private _initializeTable(): void {
    this._tableDataSource.filterPredicate = this._warehouseTableFilters.createFilterPredicate();
  }

  private _notifyWarehouseItemsChange$(): void {
    this._onWarehouseTableChange$.next(true);
  }

  private _updateCache(): void {
    this._cacheService.saveToStorage({
      categories: this._categories(),
      warehouseItems: this._warehouseItems$.getValue(),
    });
  }
}
