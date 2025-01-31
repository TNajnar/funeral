import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { DashboardTableUpcomingComponent } from './dashboard-table-upcoming/dashboard-table-upcoming';
import { DashboardAddButtonsComponent } from './dashboard-add-buttons/dashboard-add-buttons.component';
import { ReminderComponent } from './reminder/reminder.component';
import { GraphComponent } from '@app/shared/graph/graph.component';
import { IconComponent } from '@app/ui/icon/icon.component';
import { getCurrentMonthName } from '@lib/utils';
import { ERoutes } from '@lib/enums';
import { dashboard } from '@lib/staticTexts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, GraphComponent, ReminderComponent, DashboardTableUpcomingComponent,
    DashboardAddButtonsComponent, IconComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  host: { class: 'flex flex-col gap-20 w-full' },
})
export class DashboardComponent {
  protected _texts = dashboard;
  _currentMonth: string;

  constructor() {
    this._currentMonth = getCurrentMonthName();
  }

  get planningRoute(): string {
    return ERoutes.Planning;
  }
}
