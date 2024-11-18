import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AuthService } from 'services/auth.service';
import { WarehouseService } from './warehouse.service';
import { ModalComponent } from '@app/ui/modal/modal.component';
import { AddNewWarehouseItemComponent } from './add-new-warehouse-item/add-new-warehouse-item.component';
import { ButtonPrimaryComponent } from '@app/ui/button-primary/button-primary.component';
import { FlagComponent } from '@app/ui/flag/flag.component';
import { warehouseControl } from '@lib/staticTexts';

@Component({
  selector: 'app-warehouse-control',
  standalone: true,
  // eslint-disable-next-line max-len
  imports: [AddNewWarehouseItemComponent, ModalComponent, MatIconModule, MatButtonModule, ButtonPrimaryComponent, FlagComponent],
  templateUrl: './warehouse-control.component.html',
  styleUrls: ['./warehouse-control.component.css'],
  host: {
    class: 'flex flex-col',
  },
})
export class WarehouseControlComponent {
  protected _texts = warehouseControl;
  isModalOpen = signal<boolean>(false);
  isFlagged = signal<boolean>(false);

  protected _authService: AuthService = inject(AuthService);
  protected _warehouseService: WarehouseService = inject(WarehouseService);

  toggleModal(): void {
    this.isModalOpen.set(!this.isModalOpen());
  }

  onFlagClick(itemId: number): void {
    const item = this._warehouseService.warehouseItems.find((item) => item.id === itemId);

    if (item) {
      item.isFlagged = !item.isFlagged;
    }
  }

  deleteWarehouseItem(id: number): void {
    this._warehouseService.deleteWarehouseItem(id);
  }
}
