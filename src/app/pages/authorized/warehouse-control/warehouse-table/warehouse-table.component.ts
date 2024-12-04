import { Component, computed, HostBinding, inject, Signal, ViewChild } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { WarehouseTableService } from '../services/warehouse-table.service';
import { WarehouseGatewayService } from '@app/pages/authorized/warehouse-control/gateways/warehouse-gateway.service';
import { CustomPaginatorService } from 'services/custom-paginator.service';
import { FlagComponent } from '@app/ui/flag/flag.component';
import { CommentComponent } from '@app/ui/comment/comment.component';
import type { TFilterOptions } from '../utils/warehouse-control.model';
import type { TWarehouseItem } from '../utils/warehouse-control.gateway.model';
import { _DISPLAYED_COLUMNS } from '../utils/consts';
import { warehouseControl } from '@lib/staticTexts';

@Component({
  selector: 'app-warehouse-table',
  standalone: true,
  imports: [NgIf, FormsModule, FlagComponent, CommentComponent,
    MatIconModule, MatTableModule, MatPaginatorModule, MatSlideToggleModule, MatProgressSpinnerModule
  ],
  templateUrl: './warehouse-table.component.html',
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomPaginatorService }
  ],
  host: {
    class: 'flex flex-col mb-20 overflow-hidden border border-gray rounded-md',
  }
})
export class WarehouseTableComponent {
  protected _texts = warehouseControl.table;
  selectedPagination: number = 5;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @HostBinding('class.h-table-5') get hostPaginationHeight5(): boolean {
    return this.selectedPagination === 5;
  }
  @HostBinding('class.h-table-10') get hostPaginationHeight10(): boolean {
    return this.selectedPagination === 10;
  }
  @HostBinding('class.h-table-20') get hostPaginationHeight20(): boolean {
    return this.selectedPagination === 20;
  }

  protected _warehouseServiceTable: WarehouseTableService = inject(WarehouseTableService);
  private _gateway: WarehouseGatewayService = inject(WarehouseGatewayService);

  constructor() {
    this.tableDataSource.paginator = this.paginator;
  }

  get tableDataSource(): MatTableDataSource<TWarehouseItem, MatPaginator> {
    return this._warehouseServiceTable.tableDataSource;
  }

  private get _tableFilterOptions(): TFilterOptions {
    return this._warehouseServiceTable.filterOptions;
  }

  get tableColumns(): string[] {
    return _DISPLAYED_COLUMNS;
  }

  isLoading: Signal<boolean> = computed(() => {
    return this._warehouseServiceTable.isLoading();
  });

  onChangeToggle(value: boolean, type: string): void {
    this._tableFilterOptions[type === 'Flag' ? 'isFlagged' : 'hasComment'] = value;
    this._warehouseServiceTable.updateTableFilters();
  }

  onFlagClick(warehouseItem: TWarehouseItem): void {
    this._gateway.saveFlag(warehouseItem.productId).subscribe({
      next: (responseWarehouseItem: TWarehouseItem): void => {
        warehouseItem.isFlagged = responseWarehouseItem.isFlagged;
      }
    });
  }

  onSaveComment(warehouseItem: TWarehouseItem, comment?: string): void {
    this._gateway.saveComment(warehouseItem.productId, comment).subscribe({
      next: (responseWarehouseItem: TWarehouseItem): void => {
        warehouseItem.comment = responseWarehouseItem.comment;
      }
    });
  }

  deleteWarehouseItem(productId: number): void {
    this._gateway.deleteWarehouseItem(productId).subscribe({
      next: (): void => {
        this._warehouseServiceTable.deleteWarehouseItem(productId);
      }
    });
  }
}
