import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

import { MOCK_WAREHOUSE_ITEMS, type TWarehouseItem } from './warehouse-control.model';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {
  private _warehouseItems$ = new BehaviorSubject<TWarehouseItem[]>(MOCK_WAREHOUSE_ITEMS); // TODO data from API
  tableDataSource = new MatTableDataSource<TWarehouseItem>();

  get warehouseItems$(): Observable<TWarehouseItem[]> {
    return this._warehouseItems$.asObservable();
  }

  notifyUpdateWarehouseItems(items: TWarehouseItem[]): void {
    this._warehouseItems$.next(items);
  }

  toggleItemFlag(itemId: number): void {
    const currentItems = this._warehouseItems$.getValue();

    const updatedItems = currentItems.map((item) =>
      item.id === itemId ? { ...item, isFlagged: !item.isFlagged } : item
    );

    this.notifyUpdateWarehouseItems(updatedItems);
  }

  addWarehouseItem(warehouseItem: TWarehouseItem): void {
    const currentItems = this._warehouseItems$.getValue();
    this.notifyUpdateWarehouseItems([warehouseItem, ...currentItems]);
  }

  deleteWarehouseItem(id: number): void {
    const updatedItems = this._warehouseItems$.getValue().filter((item) => item.id !== id);
    this.notifyUpdateWarehouseItems(updatedItems);
  }
}
