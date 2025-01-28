import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import type { TPlannedFuneralTable } from '../lib/dashboard.types';
import { UPCOMING_TABLE_COLUMNS } from '../lib/consts';
import { MOCK_FUNERAL_DATA } from '../lib/mockData';

@Component({
  selector: 'app-dashboard-table-upcoming',
  standalone: true,
  imports: [FormsModule, DatePipe, MatTableModule],
  templateUrl: './dashboard-table-upcoming.component.html',
  host: {
    class: 'base-table-border',
  },
})
export class DashboardTableUpcomingComponent {
  displayedColumns: string[] = UPCOMING_TABLE_COLUMNS;
  dataSource = new MatTableDataSource<TPlannedFuneralTable>(MOCK_FUNERAL_DATA);
}
