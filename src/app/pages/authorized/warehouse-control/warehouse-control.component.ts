import { Component, inject, signal } from '@angular/core';
import { AsyncPipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { WarehouseTableService } from './services/warehouse-table.service';
import { WarehouseTableComponent } from './warehouse-table/warehouse-table.component';
import { ModalComponent } from '@app/ui/modal/modal.component';
import { AddNewWarehouseItemComponent } from './add-new-warehouse-item/add-new-warehouse-item.component';
import { GraphComponent } from '@app/ui/graph/graph.component';
import { ButtonSecondaryComponent } from '@app/ui/button-secondary/button-secondary.component';
import { ETabVariants, TABLE_TABS, type TTableTab } from './warehouse-control.model';
import { warehouseControl } from '@lib/staticTexts';

@Component({
  selector: 'app-warehouse-control',
  standalone: true,
  imports: [AsyncPipe, FormsModule, NgClass,
    AddNewWarehouseItemComponent, ModalComponent, ButtonSecondaryComponent, WarehouseTableComponent, GraphComponent,
    MatIconModule, MatFormFieldModule, MatInputModule
  ],
  templateUrl: './warehouse-control.component.html',
  styleUrl: 'warehouse-control.component.css',
  host: {
    class: 'flex flex-col pb-8',
  },
})
export class WarehouseControlComponent {
  protected _texts = warehouseControl;
  protected _tableTabs: TTableTab[] = TABLE_TABS;
  isModalOpen = signal<boolean>(false);
  activeTab = signal<ETabVariants>(ETabVariants.All);

  protected _warehouseServiceTable: WarehouseTableService = inject(WarehouseTableService);

  toggleModal(): void {
    this.isModalOpen.set(!this.isModalOpen());
  }

  onTabClick(tabType: ETabVariants): void {
    this.activeTab.set(tabType);
    this._warehouseServiceTable.filterOptions.tabType = tabType;
    this._warehouseServiceTable.updateTableFilters();
  }

  onSearchQueryChange(value: string): void {
    this._warehouseServiceTable.filterOptions.searchText = value.trim().toLowerCase();
    this._warehouseServiceTable.updateTableFilters();
  }
}
