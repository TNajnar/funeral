import { AfterViewInit, Component, computed, HostBinding, inject, signal, Signal, ViewChild } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { WarehouseService } from '../services/warehouse.service';
import { WarehouseTableGatewayService } from '../gateways/warehouse-table.gateway.service';
import { WarehouseCacheService } from '../services/warehouse-cache.service';
import { CustomPaginatorService } from 'services/custom-paginator.service';
import { ProductAmountChangeMenuComponent } from './product-amount-change-menu/product-amount-change-menu.component';
import { CommentComponent, FlagComponent } from '@app/ui';
import type { TFilterOptions } from '../lib/warehouse-control.model';
import type { TWarehouseItem } from '../lib/warehouse-control.gateway.model';
import { _DISPLAYED_COLUMNS, DEFAULT_PAGINATION_SIZE } from '../lib/consts';
import { warehouseControl } from '@lib/staticTexts';

@Component({
  selector: 'app-warehouse-table',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, FlagComponent, CommentComponent, ProductAmountChangeMenuComponent,
    MatIconModule, MatTableModule, MatPaginatorModule, MatSlideToggleModule,
  ],
  templateUrl: './warehouse-table.component.html',
  providers: [{ provide: MatPaginatorIntl, useClass: CustomPaginatorService }],
  host: {
    class: 'flex flex-col mb-20 border border-gray rounded-md',
  }
})
export class WarehouseTableComponent implements AfterViewInit {
  protected _texts = warehouseControl.table;
  protected _previousValue: string = '';
  activeCountMenu = signal<number | undefined>(undefined);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @HostBinding('class') get hostClasses(): string {
    switch (this._warehouseService.selectedPagination) {
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
  private _cacheService: WarehouseCacheService = inject(WarehouseCacheService);
  private _gateway: WarehouseTableGatewayService = inject(WarehouseTableGatewayService);

  ngAfterViewInit(): void {
    const cachedWarehouse = this._cacheService.getStorageData();

    if (cachedWarehouse) {
      const { tablePagination } = cachedWarehouse;
      this.paginator.pageSize = tablePagination || DEFAULT_PAGINATION_SIZE;

      this._warehouseService.setTableDataPaginator(this.paginator);
      return;
    }

    this._warehouseService.setTableDataPaginator(this.paginator);
  }

  get tableDataSource(): Readonly<MatTableDataSource<TWarehouseItem, MatPaginator>> {
    return this._warehouseService.tableDataSource;
  }

  private get _tableFilterOptions(): TFilterOptions {
    return this._warehouseService.filterOptions;
  }

  get tableColumns(): readonly string[] {
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
        this._warehouseService.updateWarehouseData();
      },
    });
  }

  onTypeChange(newType: string, warehouseItem: TWarehouseItem): void {
    if (!newType || newType === this._previousValue) {
      return;
    }

    this._gateway.changeProductType(warehouseItem.productId, newType).subscribe({
      next: (responseWarehouseItem: TWarehouseItem): void => {
        warehouseItem.type = responseWarehouseItem.type;
        this._warehouseService.updateWarehouseData();
      },
    });
  }

  onNameChange(newName: string, warehouseItem: TWarehouseItem): void {
    if (!newName || newName === this._previousValue) {
      return;
    }

    this._gateway.changeProductName(warehouseItem.productId, newName).subscribe({
      next: (responseWarehouseItem: TWarehouseItem): void => {
        warehouseItem.name = responseWarehouseItem.name;
        this._warehouseService.updateWarehouseData();
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
        this._warehouseService.updateWarehouseData();
      }
    });
  }

  onSaveComment(warehouseItem: TWarehouseItem, comment?: string): void {
    this._gateway.saveComment(warehouseItem.productId, comment).subscribe({
      next: (responseWarehouseItem: TWarehouseItem): void => {
        warehouseItem.comment = responseWarehouseItem.comment;
        this._warehouseService.updateWarehouseData();
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

  protected _storePreviousValue(event: FocusEvent): void {
    const inputElement = event.target as HTMLInputElement;

    this._previousValue = inputElement.value;
  }
}
