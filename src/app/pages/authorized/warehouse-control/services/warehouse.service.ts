import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { WarehouseTableFiltersService } from './warehouse-table-filters.service';
import { WarehouseCacheService } from './warehouse-cache.service';
import type { TFilterOptions } from '../utils/warehouse-control.model';
import type { TCategory, TWarehouseItem } from '../utils/warehouse-control.gateway.model';
import { DEFAULT_PAGINATION_SIZE, STATIC_CATEGORY_ITEM } from '../utils/consts';

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
  private _selectedPagination = signal<number>(DEFAULT_PAGINATION_SIZE);
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

  get filterOptions(): TFilterOptions {
    return this._warehouseTableFilters.filterOptions;
  }

  get onCategoryChange$(): Observable<boolean> {
    return this._onCategoryChange$.asObservable();
  }

  get tableDataSource(): Readonly<MatTableDataSource<TWarehouseItem>> {
    return this._tableDataSource;
  }

  get selectedPagination(): Readonly<number> {
    return this._selectedPagination();
  }

  setWarehouseData(newCategories: TCategory[], warehouseItems: TWarehouseItem[], pageSize?: number): void {
    this._categories.set(newCategories);
    this._selectedPagination.set(pageSize || DEFAULT_PAGINATION_SIZE);
    this._updateWarehouseItems(warehouseItems);
  }

  updateWarehouseData(): void {
    this._notifyWarehouseItemsChange$();
    this._updateCache();
  }

  addWarehouseItem(item: TWarehouseItem): void {
    this._updateWarehouseItems([item, ...this._warehouseItems$.getValue()]);
  }

  deleteWarehouseItem(productId: number): void {
    const updatedItems = this._warehouseItems$.getValue().filter(item => item.productId !== productId);
    this._updateWarehouseItems(updatedItems);
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

  setTableDataPaginator(paginator: MatPaginator): void {
    this._tableDataSource.paginator = paginator;
  }

  setPaginationSize(pageSize: number): void {
    this._selectedPagination.set(pageSize);
    this._updateCache();
  }

  private _initializeTable(): void {
    this._tableDataSource.filterPredicate = this._warehouseTableFilters.createFilterPredicate();
  }

  private _notifyWarehouseItemsChange$(): void {
    this._onWarehouseTableChange$.next(true);
  }

  private _updateWarehouseItems(warehouseItems: TWarehouseItem[]): void {
    this._warehouseItems$.next(warehouseItems);
    this._tableDataSource.data = warehouseItems;
    this._notifyWarehouseItemsChange$();
    this._updateCache();
  }

  private _updateCache(): void {
    this._cacheService.saveToStorage({
      categories: this._categories(),
      tablePagination: this._selectedPagination(),
      warehouseItems: this._warehouseItems$.getValue(),
    });
  }
}
