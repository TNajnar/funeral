import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import localeCs from '@angular/common/locales/cs';

import { routes } from './app.routes';
import { apiInterceptorFn } from 'interceptors/api.interceptor';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeCs);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([apiInterceptorFn])
    ),
    provideAnimationsAsync(),
    { provide: LOCALE_ID, useValue: 'cs' },
  ],
};
