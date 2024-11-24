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
import { ButtonSecondaryComponent } from '@app/ui/button-secondary/button-secondary.component';
import { GraphComponent } from '@app/shared/graph/graph.component';
import { ETabVariants, type TTableTab } from './warehouse-control.model';
import { warehouseControl } from '@lib/staticTexts';

const TABLE_TABS: TTableTab[] = [
  { id: 33, text: 'Vše', variant: ETabVariants.All },
  { id: 44, text: 'Rakve', variant: ETabVariants.Coffin },
  { id: 55, text: 'Urny', variant: ETabVariants.Urns },
  { id: 66, text: 'Kytky', variant: ETabVariants.Flowers },
];

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
    class: 'flex flex-col',
  },
})
export class WarehouseControlComponent {
  protected _texts = warehouseControl;
  isModalOpen = signal<boolean>(false);
  activeTab = signal<ETabVariants>(ETabVariants.All);

  protected _warehouseServiceTable: WarehouseTableService = inject(WarehouseTableService);

  protected get _tableTabs(): TTableTab[] {
    return TABLE_TABS;
  }

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
