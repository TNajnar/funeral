import { Component, computed, HostBinding, inject, signal, Signal, ViewChild } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { WarehouseService } from '../services/warehouse.service';
import { WarehouseTableGatewayService } from '../gateways/warehouse-table.gateway.service';
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
  imports: [NgIf, NgFor, FormsModule, FlagComponent, CommentComponent, ProductAmountChangeMenuComponent,
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

  protected _warehouseService: WarehouseService = inject(WarehouseService);
  private _gateway: WarehouseTableGatewayService = inject(WarehouseTableGatewayService);
  private _errorService: ErrorService = inject(ErrorService);

  constructor() {
    this.tableDataSource.paginator = this.paginator;
  }

  get tableDataSource(): MatTableDataSource<TWarehouseItem, MatPaginator> {
    return this._warehouseService.tableDataSource;
  }

  private get _tableFilterOptions(): TFilterOptions {
    return this._warehouseService.filterOptions;
  }

  get tableColumns(): string[] {
    return _DISPLAYED_COLUMNS;
  }

  isLoading: Signal<boolean> = computed(() => {
    return this._warehouseService.isLoading();
  });

  toggleCountMenu(productId: number): void {
    if (this.activeCountMenu() === productId) {
      this.activeCountMenu.set(undefined);
      return;
    }

    this.activeCountMenu.set(productId);
  }

  onCategoryChange(newCategoryId: number, warehouseItem: TWarehouseItem): void {
    this._gateway.changeProductCategory(warehouseItem.productId, newCategoryId).subscribe({
      next: (responseWarehouseItem: TWarehouseItem): void => {
        warehouseItem.productCategory = responseWarehouseItem.productCategory;
        warehouseItem.productCategoryId = responseWarehouseItem.productCategoryId;
        this._warehouseService.updateWarehouseCache();
      },
    });
  }

  onTypeChange(newType: string, warehouseItem: TWarehouseItem): void {
    if (!newType) {
      return;
    }

    this._gateway.changeProductType(warehouseItem.productId, newType).subscribe({
      next: (responseWarehouseItem: TWarehouseItem): void => {
        warehouseItem.type = responseWarehouseItem.type;
        this._warehouseService.updateWarehouseCache();
      },
    });
  }

  onNameChange(newName: string, warehouseItem: TWarehouseItem): void {
    if (!newName) {
      return;
    }

    this._gateway.changeProductName(warehouseItem.productId, newName).subscribe({
      next: (responseWarehouseItem: TWarehouseItem): void => {
        warehouseItem.name = responseWarehouseItem.name;
        this._warehouseService.updateWarehouseCache();
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
        this._warehouseService.updateWarehouseCache();
      },
    });
  }

  onChangeToggle(value: boolean, type: string): void {
    this._tableFilterOptions[type === 'Flag' ? 'isFlagged' : 'hasComment'] = value;
    this._warehouseService.updateTableFilters();
  }

  onFlagClick(warehouseItem: TWarehouseItem): void {
    this._gateway.saveFlag(warehouseItem.productId).subscribe({
      next: (responseWarehouseItem: TWarehouseItem): void => {
        warehouseItem.isFlagged = responseWarehouseItem.isFlagged;
        this._warehouseService.updateWarehouseCache();
      }
    });
  }

  onSaveComment(warehouseItem: TWarehouseItem, comment?: string): void {
    this._gateway.saveComment(warehouseItem.productId, comment).subscribe({
      next: (responseWarehouseItem: TWarehouseItem): void => {
        warehouseItem.comment = responseWarehouseItem.comment;
        this._warehouseService.updateWarehouseCache();
      }
    });
  }

  deleteWarehouseItem(productId: number): void {
    this._gateway.deleteWarehouseItem(productId).subscribe({
      next: (): void => {
        this._warehouseService.deleteWarehouseItem(productId);
      }
    });
  }
}
