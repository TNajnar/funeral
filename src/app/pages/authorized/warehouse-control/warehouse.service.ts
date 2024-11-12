import { Injectable } from '@angular/core';

import type { TWarehouseItem } from './warehouse-control.model';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {
  private _warehouseItems: TWarehouseItem[] = []; // TODO data from API

  get warehouseItems(): TWarehouseItem[] {
    return this._warehouseItems;
  }

  addWarehouseItem(warehouseItem: TWarehouseItem): void {
    this._warehouseItems.push(warehouseItem);
  }

  deleteWarehouseItem(id: number): void {
    this._warehouseItems = this._warehouseItems.filter((item) => item.id !== id);
  }
}
