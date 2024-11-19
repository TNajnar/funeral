import { Injectable } from '@angular/core';

import type { TWarehouseItem } from './warehouse-control.model';

const mockItems = [
  {
    coffinType: 'Coffin type 1',
    comment: undefined,
    date: '2021-01-01',
    id: 2,
    isFlagged: false,
    name: 'Name 1',
    outcome: 1,
    profit: 1000,
  }
];

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {
  private _warehouseItems: TWarehouseItem[] = mockItems; // TODO data from API

  get warehouseItems(): TWarehouseItem[] {
    return this._warehouseItems;
  }

  addWarehouseItem(warehouseItem: TWarehouseItem): void {
    this._warehouseItems.unshift(warehouseItem);
  }

  deleteWarehouseItem(id: number): void {
    this._warehouseItems = this._warehouseItems.filter((item) => item.id !== id);
  }
}
