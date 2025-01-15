import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../environments/environment';

export const apiInterceptorFn = (request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  if (!request.url.startsWith('http')) {
    request = request.clone({
      url: `${environment.apiUrl}${request.url}`
    });
  }

  return next(request);
};
