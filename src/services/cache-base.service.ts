import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export abstract class CacheServiceBase<T> {
  protected storageKey!: string;

  constructor() {
    this._initializeCache();
  }

  protected _initializeCache(): void {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  saveToStorage(data: T): void {}

  getStorageData(): T | null {
    const jsonData = localStorage.getItem(this.storageKey);
    if (jsonData) {
      return JSON.parse(jsonData) as T;
    }
    return null;
  }

  clearData(): void {
    localStorage.removeItem(this.storageKey);
  }
}
