import { Injectable } from '@angular/core';

import { CacheServiceBase } from 'services/cache-base.service';
import type { TCategory, TWarehouseItem } from '../lib/warehouse-control.gateway.model';
import { DEFAULT_PAGINATION_SIZE } from '../lib/consts';

type TWarehouseCache = {
  categories: TCategory[];
  tablePagination?: number;
  warehouseItems: TWarehouseItem[];
};

const INIT_STORAGE: TWarehouseCache = {
  categories: [],
  tablePagination: DEFAULT_PAGINATION_SIZE,
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

