import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AuthService } from 'services/auth.service';
import { WarehouseService } from './warehouse.service';
import { ModalComponent } from '@app/ui/modal/modal.component';
import { AddNewWarehouseItemComponent } from './add-new-warehouse-item/add-new-warehouse-item.component';
import { ButtonComponent } from '@app/ui/button/button.component';
import { warehouseControl } from '@lib/staticTexts';

@Component({
  selector: 'app-warehouse-control',
  standalone: true,
  imports: [AddNewWarehouseItemComponent, ModalComponent, MatIconModule, MatButtonModule, ButtonComponent],
  templateUrl: './warehouse-control.component.html',
  styleUrls: ['./warehouse-control.component.css'],
  host: {
    class: 'flex flex-col',
  },
})
export class WarehouseControlComponent {
  protected _texts = warehouseControl;
  isModalOpen = signal<boolean>(false);

  private _router: Router = inject(Router);
  protected _authService: AuthService = inject(AuthService);
  protected _warehouseService: WarehouseService = inject(WarehouseService);

  toggleModal(): void {
    this.isModalOpen.set(!this.isModalOpen());
  }

  onWarehouseItemClick(id: number): void {
    this._router.navigate([`/item/${id}`]);
  }

  deleteWarehouseItem(id: number): void {
    this._warehouseService.deleteWarehouseItem(id);
  }
}
