import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import type { TPlannedFuneralTable } from '../dashboard.model';
import { MOCK_FUNERAL_DATA } from '../mockData';

@Component({
  selector: 'app-dashboard-table-service',
  standalone: true,
  imports: [FormsModule, DatePipe, MatTableModule],
  templateUrl: './dashboard-table-service.component.html',
  host: {
    class: 'flex flex-col overflow-hidden border border-gray rounded-md'
  }
})
export class DashboardTableServiceComponent {
  displayedColumns: string[] = ['timeCeremony', 'placeCeremony', 'customer'];
  dataSource = new MatTableDataSource<TPlannedFuneralTable>(MOCK_FUNERAL_DATA);
}
