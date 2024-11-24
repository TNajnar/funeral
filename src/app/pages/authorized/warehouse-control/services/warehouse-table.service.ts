import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

import { WarehouseTableFiltersService } from './warehouse-table-filters.service';
import type { TFilterOptions, TWarehouseItem } from '../warehouse-control.model';
import { MOCK_WAREHOUSE_ITEMS } from '../mockData';

@Injectable({
  providedIn: 'root'
})
export class WarehouseTableService {
  private _warehouseItems$ = new BehaviorSubject<TWarehouseItem[]>(MOCK_WAREHOUSE_ITEMS); // TODO data from API
  tableDataSource = new MatTableDataSource<TWarehouseItem>();

  private _warehouseTableFilters: WarehouseTableFiltersService = inject(WarehouseTableFiltersService);

  constructor() {
    this.tableDataSource.filterPredicate = this._warehouseTableFilters._createFilterPredicate();
  }

  get warehouseItems$(): Observable<TWarehouseItem[]> {
    return this._warehouseItems$.asObservable();
  }

  get filterOptions(): TFilterOptions {
    return this._warehouseTableFilters.filterOptions;
  }

  notifyUpdateWarehouseItems(items: TWarehouseItem[]): void {
    this._warehouseItems$.next(items);
  }

  addWarehouseItem(warehouseItem: TWarehouseItem): void {
    const currentItems = this._warehouseItems$.getValue();
    this.notifyUpdateWarehouseItems([warehouseItem, ...currentItems]);
  }

  deleteWarehouseItem(id: number): void {
    const updatedItems = this._warehouseItems$.getValue().filter((item) => item.id !== id);
    this.notifyUpdateWarehouseItems(updatedItems);
  }

  updateTableFilters(): void {
    this.tableDataSource.filter = JSON.stringify(this.filterOptions);
  }
}
