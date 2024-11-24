import { Component, inject, LOCALE_ID } from '@angular/core';
import { DatePipe, registerLocaleData } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import localeCs from '@angular/common/locales/cs';

import { GraphComponent } from '@app/ui/graph/graph.component';

registerLocaleData(localeCs);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatButtonModule, GraphComponent],
  templateUrl: './dashboard.component.html',
  host: {
    class: 'flex flex-col gap-28 w-full'
  },
  providers: [
    DatePipe,
    { provide: LOCALE_ID, useValue: 'cs' }
  ]
})
export class DashboardComponent {
  protected _currentMonth: string | null;

  private _datePipe: DatePipe = inject(DatePipe);

  constructor() {
    this._currentMonth = this._datePipe.transform(new Date(), 'MMMM');
  }
}
