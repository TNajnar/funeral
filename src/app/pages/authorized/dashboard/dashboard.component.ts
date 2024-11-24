import { Component, inject, LOCALE_ID } from '@angular/core';
import { DatePipe, registerLocaleData } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import localeCs from '@angular/common/locales/cs';

import { DashboardTableServiceComponent } from './dashboard-table-service/dashboard-table-service.component';
import { DashboardTableFuneralComponent } from './dashboard-table-funeral/dashboard-table-funeral.component';
import { ReminderComponent } from './reminder/reminder.component';
import { GraphComponent } from '@app/shared/graph/graph.component';
import { ERoutes } from '@lib/enums';
import { dashboard } from '@lib/staticTexts';

registerLocaleData(localeCs);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink,
    GraphComponent, DashboardTableServiceComponent, DashboardTableFuneralComponent, ReminderComponent,
    MatButtonModule, MatIcon, MatTooltipModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  host: {
    class: 'flex flex-col gap-20 w-full'
  },
  providers: [
    DatePipe,
    { provide: LOCALE_ID, useValue: 'cs' }
  ]
})
export class DashboardComponent {
  protected _texts = dashboard;
  _currentMonth: string | null;

  private _datePipe: DatePipe = inject(DatePipe);

  constructor() {
    this._currentMonth = this._datePipe.transform(new Date(), 'MMMM');
  }

  get planningRoute(): string {
    return ERoutes.Planning;
  }
}
