import { Component, computed, HostBinding, inject, signal, Signal, ViewChild } from '@angular/core';
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
import { ErrorService } from 'services/error.service';
import { ProductAmountChangeMenuComponent } from './product-amount-change-menu/product-amount-change-menu.component';
import { CommentComponent, FlagComponent } from '@app/ui';
import type { TFilterOptions } from '../utils/warehouse-control.model';
import type { TWarehouseItem } from '../utils/warehouse-control.gateway.model';
import { _DISPLAYED_COLUMNS } from '../utils/consts';
import { warehouseControl } from '@lib/staticTexts';

@Component({
  selector: 'app-warehouse-table',
  standalone: true,
  imports: [NgIf, FormsModule, FlagComponent, CommentComponent, ProductAmountChangeMenuComponent,
    MatIconModule, MatTableModule, MatPaginatorModule, MatSlideToggleModule, MatProgressSpinnerModule,
  ],
  templateUrl: './warehouse-table.component.html',
  providers: [{ provide: MatPaginatorIntl, useClass: CustomPaginatorService }],
  host: {
    class: 'flex flex-col mb-20 border border-gray rounded-md',
  }
})
export class WarehouseTableComponent {
  protected _texts = warehouseControl.table;
  activeCountMenu = signal<number | undefined>(undefined);
  selectedPagination: number = 5;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @HostBinding('class') get hostClasses(): string {
    switch (this.selectedPagination) {
      case 5:
        return 'h-table-5';
      case 10:
        return 'h-table-10';
      case 20:
        return 'h-table-20';
      default:
        return '';
    }
  }

  protected _warehouseServiceTable: WarehouseTableService = inject(WarehouseTableService);
  private _gateway: WarehouseGatewayService = inject(WarehouseGatewayService);
  private _errorService: ErrorService = inject(ErrorService);

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

  toggleCountMenu(productId: number): void {
    if (this.activeCountMenu() === productId) {
      this.activeCountMenu.set(undefined);
      return;
    }

    this.activeCountMenu.set(productId);
  }

  onTypeChange(newType: string, warehouseItem: TWarehouseItem): void {
    this._gateway.changeProductType(warehouseItem.productId, newType).subscribe({
      next: (responseWarehouseItem: TWarehouseItem): void => {
        warehouseItem.type = responseWarehouseItem.type;
        this._warehouseServiceTable.updateWarehouseCache();
      },
    });
  }

  onNameChange(newName: string, warehouseItem: TWarehouseItem): void {
    this._gateway.changeProductName(warehouseItem.productId, newName).subscribe({
      next: (responseWarehouseItem: TWarehouseItem): void => {
        warehouseItem.name = responseWarehouseItem.name;
        this._warehouseServiceTable.updateWarehouseCache();
      },
    });
  }

  onAmountChange(newValue: string, warehouseItem: TWarehouseItem): void {
    const parsedValue = Number(newValue);

    if (isNaN(parsedValue)) {
      this._errorService.showError('Vstup není číslo.');
      return;
    }

    this._gateway.stockUpProduct(warehouseItem.productId, parsedValue).subscribe({
      next: (responseWarehouseItem: TWarehouseItem): void => {
        warehouseItem.inStock = responseWarehouseItem.inStock;
        this._warehouseServiceTable.updateWarehouseCache();
      },
    });
  }

  onChangeToggle(value: boolean, type: string): void {
    this._tableFilterOptions[type === 'Flag' ? 'isFlagged' : 'hasComment'] = value;
    this._warehouseServiceTable.updateTableFilters();
  }

  onFlagClick(warehouseItem: TWarehouseItem): void {
    this._gateway.saveFlag(warehouseItem.productId).subscribe({
      next: (responseWarehouseItem: TWarehouseItem): void => {
        warehouseItem.isFlagged = responseWarehouseItem.isFlagged;
        this._warehouseServiceTable.updateWarehouseCache();
      }
    });
  }

  onSaveComment(warehouseItem: TWarehouseItem, comment?: string): void {
    this._gateway.saveComment(warehouseItem.productId, comment).subscribe({
      next: (responseWarehouseItem: TWarehouseItem): void => {
        warehouseItem.comment = responseWarehouseItem.comment;
        this._warehouseServiceTable.updateWarehouseCache();
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
