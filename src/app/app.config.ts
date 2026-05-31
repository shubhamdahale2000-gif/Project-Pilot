import {
  ApplicationConfig,
  ErrorHandler,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';

import { provideRouter } from '@angular/router';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

import { ShareDataService } from './share-data.service';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({
      eventCoalescing: true,
    }),

    provideRouter(routes),

    provideHttpClient(withInterceptorsFromDi()),

    provideCharts(withDefaultRegisterables()),

    importProvidersFrom(ReactiveFormsModule, FormsModule, FontAwesomeModule),

    {
      provide: ErrorHandler,
      useClass: ShareDataService,
    },
  ],
};
