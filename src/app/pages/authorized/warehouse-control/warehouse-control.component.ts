import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { AuthService } from 'services/auth.service';
import { tableHeaders } from '@lib/staticTexts';

type TWareItem = {
  id: number;
  date: string;
  coffinType: string;
  name: string;
  profit: number;
  outcome: number;
}

const exampleWareItems: TWareItem[] = [
  { id: 55, date: '2023-10-01', coffinType: 'Dřevěná', name: 'Jan Novák', profit: 1000, outcome: 500 },
  { id: 66, date: '2023-10-02', coffinType: 'Kovová', name: 'Petr Svoboda', profit: 1500, outcome: 700 },
];

@Component({
  selector: 'app-warehouse-control',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './warehouse-control.component.html',
  styleUrls: ['./warehouse-control.component.css'],
})
export class WarehouseControlComponent {
  protected _texts = tableHeaders;
  protected _wareItems = exampleWareItems;

  protected _authService: AuthService = inject(AuthService);
  private _router: Router = inject(Router);

  onItemClick(id: number): void {
    console.log(id);
    this._router.navigate([`/item/${id}`]);
  }
}
