import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';

import { BaseGatewayService } from 'services/gateway-base.service';
import type { TNewItemArgs, TWarehouseItem, TWarehouseItems } from '../utils/warehouse-control.gateway.model';

const BASE_URL = 'http://localhost:8080/api/v1';

@Injectable({
  providedIn: 'root',
})
export class WarehouseTableGatewayService extends BaseGatewayService {
  fetchAllWarehouseItems(): Observable<TWarehouseItems> {
    return this._httpClient.get<TWarehouseItems>(`${BASE_URL}/products`).pipe(
      catchError((error) => {
        return this._handleError(error, 'Chyba při stahování všech dat na skladě');
      })
    );
  }

  addWarehouseItem(warehouseItem: TNewItemArgs): Observable<TWarehouseItem> {
    return this._httpClient.post<TWarehouseItem>(`${BASE_URL}/products`, warehouseItem).pipe(
      catchError((error) => {
        return this._handleError(error, 'Chyba při přidávání nové položky');
      })
    );
  }

  deleteWarehouseItem(productId: number): Observable<void> {
    return this._httpClient.delete<void>(`${BASE_URL}/products/${productId}`).pipe(
      catchError((error) => {
        return this._handleError(error, 'Chyba při mazání položky');
      })
    );
  }

  changeProductCategory(productId: number, productCategoryId: number): Observable<TWarehouseItem> {
    return this._httpClient.patch<TWarehouseItem>(`${BASE_URL}/products/${productId}/category/${productCategoryId}`, {})
      .pipe(
        catchError((error) => {
          return this._handleError(error, 'Chyba při změně kategorie produktu');
        })
      );
  }

  changeProductType(productId: number, type: string): Observable<TWarehouseItem> {
    return this._httpClient.patch<TWarehouseItem>(`${BASE_URL}/products/${productId}/type`, { value: type }).pipe(
      catchError((error) => this._handleError(error, 'Chyba při změně typu produktu'))
    );
  }

  changeProductName(productId: number, name: string): Observable<TWarehouseItem> {
    return this._httpClient.patch<TWarehouseItem>(`${BASE_URL}/products/${productId}/name`, { value: name }).pipe(
      catchError((error) => this._handleError(error, 'Chyba při změně názvu produktu'))
    );
  }

  changeProductAmount(productId: number, amount: number): Observable<TWarehouseItem> {
    return this._httpClient.patch<TWarehouseItem>(`${BASE_URL}/products/${productId}/inStock/${amount}`, {}).pipe(
      catchError((error) => this._handleError(error, 'Chyba při změně množství produktu'))
    );
  }

  stockUpProduct(productId: number, quantity: number): Observable<TWarehouseItem> {
    return this._httpClient.patch<TWarehouseItem>(`${BASE_URL}/products/${productId}/stock-up/${quantity}`, {}).pipe(
      catchError((error) => this._handleError(error, 'Chyba při naskladnění produktu'))
    );
  }

  saveFlag(productId: number): Observable<TWarehouseItem> {
    return this._httpClient.patch<TWarehouseItem>(`${BASE_URL}/products/${productId}/flag`, { productId }).pipe(
      catchError((error) => this._handleError(error, 'Chyba při ukládání vlajky'))
    );
  }

  saveComment(productId: number, comment?: string): Observable<TWarehouseItem> {
    return this._httpClient.patch<TWarehouseItem>(`${BASE_URL}/products/${productId}/comment`, { value: comment }).pipe(
      catchError((error) => this._handleError(error, 'Chyba při ukládání komentáře'))
    );
  }
}
