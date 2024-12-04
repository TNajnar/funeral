import { inject, Injectable, Signal, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

import { WarehouseTableFiltersService } from './warehouse-table-filters.service';
import type { TFilterOptions } from '../utils/warehouse-control.model';
import type { TCategory, TWarehouseItem } from '../utils/warehouse-control.gateway.model';

@Injectable({
  providedIn: 'root'
})
export class WarehouseTableService {
  private _warehouseItems$ = new BehaviorSubject<TWarehouseItem[]>([]);
  private _tableDataSource = new MatTableDataSource<TWarehouseItem>();
  private _categories = signal<TCategory[]>([]);
  isLoading = signal<boolean>(false);

  private _warehouseTableFilters: WarehouseTableFiltersService = inject(WarehouseTableFiltersService);

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

  notifyUpdateWarehouseItems$(items: TWarehouseItem[]): void {
    this._warehouseItems$.next(items);
    this._tableDataSource.data = this._warehouseItems$.getValue();
  }

  addWarehouseItem(warehouseItem: TWarehouseItem): void {
    const currentItems = this._warehouseItems$.getValue();
    this.notifyUpdateWarehouseItems$([warehouseItem, ...currentItems]);
  }

  deleteWarehouseItem(productId: number): void {
    const updatedItems = this._warehouseItems$.getValue().filter((warehouseItem) =>
      warehouseItem.productId !== productId
    );
    this.notifyUpdateWarehouseItems$(updatedItems);
  }

  updateTableFilters(): void {
    this._tableDataSource.filter = JSON.stringify(this.filterOptions);
  }

  setCategories(newCategory: TCategory[]): void {
    this._categories.set(newCategory);
  }

  createNewCategory(newCategory: TCategory): void {
    this._categories.set([...this._categories(), newCategory]);
  }
}
