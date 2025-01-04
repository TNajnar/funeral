import { inject, Injectable } from '@angular/core';
import { catchError, forkJoin, Observable, throwError } from 'rxjs';

import { WarehouseTableGatewayService } from './warehouse-table.gateway.service';
import { BaseGatewayService } from 'services/gateway-base.service';
import type { TCategories, TCategory, TWarehouseItems } from '../utils/warehouse-control.gateway.model';

const BASE_URL = 'http://localhost:8080/api/v1';

@Injectable({
  providedIn: 'root',
})
export class WarehouseGatewayService extends BaseGatewayService {
  private _warehouseTableGateway: WarehouseTableGatewayService = inject(WarehouseTableGatewayService);

  loadCacheableData(): Observable<[TWarehouseItems, TCategories]> {
    return forkJoin([this._warehouseTableGateway.fetchAllWarehouseItems(), this._fetchCategories()]).pipe(
      catchError((error) => {
        this._errorService.showError('Chyba při stahování všech položek na skladu a kategorii: ' + error.message);
        return throwError(() => new Error('Failed to fetch all warehouse items and categories.', error));
      })
    );
  }

  private _fetchCategories(): Observable<TCategories> {
    return this._httpClient.get<TCategories>(`${BASE_URL}/product-categories`).pipe(
      catchError((error) => {
        this._errorService.showError('Chyba při stahování všech kategorií: ' + error.message);
        return throwError(() => new Error('Failed to fetch all categories.', error));
      })
    );
  }

  createNewCategory(newCategory: string): Observable<TCategory> {
    return this._httpClient.post<TCategory>(`${BASE_URL}/product-categories/${newCategory}`, {}).pipe(
      catchError((error) => {
        this._errorService.showError('Chyba při vytvoření kategorie: ' + error.message);
        return throwError(() => new Error('Failed to create new category', error));
      })
    );
  }

  renameCategory(categoryId: number, newName: string): Observable<TCategory> {
    return this._httpClient.patch<TCategory>(`${BASE_URL}/product-categories/${categoryId}/name`,
      { value: newName }
    ).pipe(
      catchError((error) => {
        this._errorService.showError('Chyba při změně kategorie produktu: ' + error.message);
        return throwError(() => new Error('Failed to change product category.', error));
      })
    );
  }

  deleteCategory(categoryId: number): Observable<void> {
    return this._httpClient.delete<void>(`${BASE_URL}/product-categories/${categoryId}`).pipe(
      catchError((error) => {
        this._errorService.showError('Chyba při mazání kategorie: ' + error.message);
        return throwError(() => new Error('Failed to remove category', error));
      })
    );
  }
}
