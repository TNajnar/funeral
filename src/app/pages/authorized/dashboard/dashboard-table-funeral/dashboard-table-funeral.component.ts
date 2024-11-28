import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-dashboard-table-funeral',
  standalone: true,
  imports: [FormsModule, MatTableModule],
  templateUrl: './dashboard-table-funeral.component.html',
  host: {
    class: 'flex flex-col overflow-hidden border border-gray rounded-md'
  }
})
export class DashboardTableFuneralComponent {
  displayedColumns: string[] = ['dateOfNegotiation', 'placeCeremony', 'timeCeremony', 'deceased', 'customer'];
  dataSource = new MatTableDataSource<IPlannedFuneralTable>(MOCK_FUNERAL_DATA);

}

interface IPlannedFuneralTable {
  id: number;
  dateOfNegotiation: string;
  placeCeremony: string;
  timeCeremony: string;
  deceased: string;
  customer: string;
}

const MOCK_FUNERAL_DATA: IPlannedFuneralTable[] = [
  // eslint-disable-next-line max-len
  { id: 1, dateOfNegotiation: '2023-01-01', placeCeremony: 'Kostel sv. Jana', timeCeremony: '2023-01-05 10:00', deceased: 'Jan Novák', customer: 'Petr Novák' },
  // eslint-disable-next-line max-len
  { id: 2, dateOfNegotiation: '2023-02-15', placeCeremony: 'Krematorium Praha', timeCeremony: '2023-02-20 14:00', deceased: 'Marie Svobodová', customer: 'Jana Svobodová' },
  // eslint-disable-next-line max-len
  { id: 3, dateOfNegotiation: '2023-03-10', placeCeremony: 'Hřbitov Olšany', timeCeremony: '2023-03-15 11:00', deceased: 'Karel Dvořák', customer: 'Eva Dvořáková' },
  // eslint-disable-next-line max-len
  { id: 4, dateOfNegotiation: '2023-04-05', placeCeremony: 'Kostel sv. Václava', timeCeremony: '2023-04-10 09:00', deceased: 'Anna Novotná', customer: 'Tomáš Novotný' },
  // eslint-disable-next-line max-len
  { id: 5, dateOfNegotiation: '2023-05-20', placeCeremony: 'Krematorium Brno', timeCeremony: '2023-05-25 13:00', deceased: 'Josef Černý', customer: 'Lucie Černá' }
];
