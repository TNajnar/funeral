import { inject, Injectable } from '@angular/core';
import { catchError, forkJoin, Observable } from 'rxjs';

import { WarehouseTableGatewayService } from './warehouse-table.gateway.service';
import { BaseGatewayService } from 'services/gateway-base.service';
import type { TCategories, TCategory, TStatistics, TWarehouseItems } from '../lib/warehouse-control.gateway.model';

const BASE_URL = 'api/v1';

@Injectable({
  providedIn: 'root',
})
export class WarehouseGatewayService extends BaseGatewayService {
  private _warehouseTableGateway: WarehouseTableGatewayService = inject(WarehouseTableGatewayService);

  loadCacheableData(): Observable<[TWarehouseItems, TCategories]> {
    return forkJoin([this._warehouseTableGateway.fetchAllWarehouseItems(), this._fetchCategories()]).pipe(
      catchError((error) => this._handleError(error, 'Chyba při stahování všech položek na skladu a kategorii'))
    );
  }

  private _fetchCategories(): Observable<TCategories> {
    return this._httpClient.get<TCategories>(`${BASE_URL}/product-categories`).pipe(
      catchError((error) => this._handleError(error, 'Chyba při stahování všech kategorií'))
    );
  }

  createNewCategory(newCategory: string): Observable<TCategory> {
    return this._httpClient.post<TCategory>(`${BASE_URL}/product-categories/${newCategory}`, {}).pipe(
      catchError((error) => this._handleError(error, 'Chyba při vytvoření kategorie'))
    );
  }

  renameCategory(categoryId: number, newName: string): Observable<TCategory> {
    return this._httpClient.patch<TCategory>(`${BASE_URL}/product-categories/${categoryId}/name`, { value: newName })
      .pipe(
        catchError((error) => this._handleError(error, 'Chyba při změně kategorie produktu'))
      );
  }

  deleteCategory(categoryId: number): Observable<void> {
    return this._httpClient.delete<void>(`${BASE_URL}/product-categories/${categoryId}`).pipe(
      catchError((error) => this._handleError(error, 'Chyba při mazání kategorie'))
    );
  }

  fetchStatistics(categoryId: number, yearMonth: string): Observable<TStatistics> {
    return this._httpClient.get<TStatistics>(`${BASE_URL}/statistics?categoryId=${categoryId}&yearMonth=${yearMonth}`)
      .pipe(
        catchError((error) => this._handleError(error, 'Chyba při stahování statistik'))
      );
  }
}
