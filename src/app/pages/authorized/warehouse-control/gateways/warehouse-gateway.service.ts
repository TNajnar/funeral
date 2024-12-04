import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

import { TWarehouseItem, TWarehouseItems } from '../warehouse-control.model';

const BASE_URL = 'http://localhost:8080/api/v1';

@Injectable({
  providedIn: 'root'
})
export class WarehouseGatewayService {
  private _httpClient = inject(HttpClient);

  allWarehouseItems(): Observable<TWarehouseItems> {
    return this._httpClient.get<TWarehouseItems>(`${BASE_URL}/products`).pipe(
      catchError((error) => {
        return throwError(() => new Error('Failed to fetch all warehouse items.', error));
      })
    );
  }

  addWarehouseItem(warehouseItem: TWarehouseItem): Observable<void> {
    return this._httpClient.post<void>(`${BASE_URL}/products`, warehouseItem).pipe(
      catchError((error) => {
        return throwError(() => new Error('Failed to add new item.', error));
      })
    );
  }

  saveFlag(productId: number): Observable<void> {
    return this._httpClient.patch<void>(`${BASE_URL}/products/${productId}/flag`, { productId }).pipe(
      catchError((error) => {
        return throwError(() => new Error('Failed to save flag.', error));
      })
    );;
  }
}
