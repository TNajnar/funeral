import { Injectable } from '@angular/core';

import { CacheServiceBase } from 'services/cache-base.service';
import { TCategory, TWarehouseItem } from '../utils/warehouse-control.gateway.model';

type TWarehouseCache = {
  categories: TCategory[];
  warehouseItems: TWarehouseItem[];
};

const INIT_STORAGE: TWarehouseCache = {
  categories: [],
  warehouseItems: [],
};

@Injectable({
  providedIn: 'root',
})
export class WarehouseCacheService extends CacheServiceBase<TWarehouseCache> {
  private _warehouseCache!: TWarehouseCache;

  constructor() {
    super();
  }

  get warehouseCache(): TWarehouseCache {
    return this._warehouseCache;
  }

  protected override _initializeCache(): void {
    this.storageKey = 'warehouse';
    this._warehouseCache = INIT_STORAGE;
  }

  override saveToStorage(data: TWarehouseCache): void {
    this._warehouseCache = data;
    localStorage.setItem(this.storageKey, JSON.stringify(this._warehouseCache));
  }
}

