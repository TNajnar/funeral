import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

import { BaseGatewayService } from 'services/BaseGateway.service';
import type {
  TCategories, TCategory, TNewItemArgs, TWarehouseItem, TWarehouseItems,
} from '../utils/warehouse-control.gateway.model';

const BASE_URL = 'http://localhost:8080/api/v1';

@Injectable({
  providedIn: 'root',
})
export class WarehouseGatewayService extends BaseGatewayService {
  fetchAllWarehouseItems(): Observable<TWarehouseItems> {
    return this._httpClient.get<TWarehouseItems>(`${BASE_URL}/products`).pipe(
      catchError((error) => {
        this._errorService.showError('Chyba při stahování všech dat na skladě: ' + error.message);
        return throwError(() => new Error('Failed to fetch all warehouse items.', error));
      })
    );
  }

  addWarehouseItem(warehouseItem: TNewItemArgs): Observable<TWarehouseItem> {
    return this._httpClient.post<TWarehouseItem>(`${BASE_URL}/products`, warehouseItem).pipe(
      catchError((error) => {
        this._errorService.showError('Chyba při přidávání nové položky: ' + error.message);
        return throwError(() => new Error('Failed to add new item.', error));
      })
    );
  }

  deleteWarehouseItem(productId: number): Observable<void> {
    return this._httpClient.delete<void>(`${BASE_URL}/products/${productId}`).pipe(
      catchError((error) => {
        this._errorService.showError('Chyba při mazání položky: ' + error.message);
        return throwError(() => new Error('Failed to delete item.', error));
      })
    );
  }

  saveFlag(productId: number): Observable<TWarehouseItem> {
    return this._httpClient.patch<TWarehouseItem>(`${BASE_URL}/products/${productId}/flag`, { productId }).pipe(
      catchError((error) => {
        this._errorService.showError('Chyba při ukládání vlajky: ' + error.message);
        return throwError(() => new Error('Failed to save flag.', error));
      })
    );
  }

  saveComment(productId: number, comment?: string): Observable<TWarehouseItem> {
    return this._httpClient.patch<TWarehouseItem>(`${BASE_URL}/products/${productId}/comment`, { value: comment }).pipe(
      catchError((error) => {
        this._errorService.showError('Chyba při ukládání komentáře: ' + error.message);
        return throwError(() => new Error('Failed to save comment.', error));
      })
    );
  }

  changeProductName(productId: number, name: string): Observable<TWarehouseItem> {
    return this._httpClient.patch<TWarehouseItem>(`${BASE_URL}/products/${productId}/name`, { value: name }).pipe(
      catchError((error) => {
        this._errorService.showError('Chyba při změně názvu produktu: ' + error.message);
        return throwError(() => new Error('Failed to change products name.', error));
      })
    );
  }

  changeProductAmount(productId: number, amount: number): Observable<TWarehouseItem> {
    return this._httpClient.patch<TWarehouseItem>(`${BASE_URL}/products/${productId}/inStock/${amount}`, {}).pipe(
      catchError((error) => {
        this._errorService.showError('Chyba při změně množství produktu: ' + error.message);
        return throwError(() => new Error('Failed to change products amount.', error));
      })
    );
  }

  stockUpProduct(productId: number, quantity: number): Observable<TWarehouseItem> {
    return this._httpClient.patch<TWarehouseItem>(`${BASE_URL}/products/${productId}/stock-up/${quantity}`, {}).pipe(
      catchError((error) => {
        this._errorService.showError('Chyba při naskladnění produktu: ' + error.message);
        return throwError(() => new Error('Failed to stock up products amount.', error));
      })
    );
  }

  fetchCategories(): Observable<TCategories> {
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
}
