import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseGatewayService {
  protected _httpClient: HttpClient = inject(HttpClient);
  protected _errorService: ErrorService = inject(ErrorService);
}
