import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { ErrorService } from './error.service';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseGatewayService {
  protected _httpClient: HttpClient = inject(HttpClient);
  protected _errorService: ErrorService = inject(ErrorService);

  protected _handleError(error: any, contextMessage: string): Observable<never> {
    let errorMessage = contextMessage;

    if (error.error && error.error.message) {
      errorMessage = `${contextMessage}: ${error.error.message}`;
    } else if (error.message) {
      errorMessage = `${contextMessage}: ${error.message}`;
    } else {
      errorMessage = `${contextMessage}: Neznámá chyba`;
    }

    this._errorService.showError(errorMessage);
    return throwError(() => new Error(contextMessage, { cause: error }));
  }
}
