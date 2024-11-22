import { Component, inject, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { WarehouseService } from './warehouse.service';
import { WarehouseTableComponent } from './warehouse-table/warehouse-table.component';
import { ModalComponent } from '@app/ui/modal/modal.component';
import { AddNewWarehouseItemComponent } from './add-new-warehouse-item/add-new-warehouse-item.component';
import { ButtonPrimaryComponent } from '@app/ui/button-primary/button-primary.component';
import { warehouseControl } from '@lib/staticTexts';

@Component({
  selector: 'app-warehouse-control',
  standalone: true,
  imports: [AsyncPipe, FormsModule,
    AddNewWarehouseItemComponent, ModalComponent, ButtonPrimaryComponent, WarehouseTableComponent,
    MatIconModule, MatFormFieldModule, MatInputModule,
  ],
  templateUrl: './warehouse-control.component.html',
  host: {
    class: 'flex flex-col',
  },
})
export class WarehouseControlComponent {
  protected _texts = warehouseControl;
  isModalOpen = signal<boolean>(false);

  protected _warehouseService: WarehouseService = inject(WarehouseService);

  toggleModal(): void {
    this.isModalOpen.set(!this.isModalOpen());
  }

  onSearchQueryChange(value: string): void {
    this._warehouseService.tableDataSource.filter = value.trim().toLowerCase();
  }
}
