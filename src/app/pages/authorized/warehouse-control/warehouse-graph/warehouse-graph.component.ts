import { Component, computed, DestroyRef, inject, OnInit, signal, Signal } from '@angular/core';
import { Observable } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { MatTabsModule } from '@angular/material/tabs';

import { GraphComponent } from '@app/shared/graph/graph.component';
import { WarehouseGatewayService } from '../gateways/warehouse.gateway.service';
import { WarehouseService } from '../services/warehouse.service';
import { getStatisticsDate, getCurrentMonthName } from '../utils/utils';
import type { TStatistics } from '../utils/warehouse-control.gateway.model';

@Component({
  selector: 'app-warehouse-graph',
  standalone: true,
  imports: [GraphComponent, MatTabsModule],
  templateUrl: './warehouse-graph.component.html',
})
export class WarehouseGraphComponent implements OnInit {
  statistics = signal<TStatistics>({} as TStatistics);
  currentMonthTitle!: string;
  isLoading = false;

  private _warehouseService: WarehouseService = inject(WarehouseService);
  private _gateway: WarehouseGatewayService = inject(WarehouseGatewayService);
  private _destroyRef: DestroyRef = inject(DestroyRef);

  activeTab: Signal<number> = this._warehouseService.activeTab;
  activeTab$: Observable<number> = toObservable(this.activeTab);

  monthCategoryStatistics: Signal<number[]> = computed(() => {
    const { statistics } = this.statistics();

    if (!statistics) {
      return [];
    }

    return [statistics[0].inStock, statistics[0].purchased, statistics[0].sold];
  });

  constructor() {
    this.currentMonthTitle = getCurrentMonthName();
  }

  ngOnInit(): void {
    this.activeTab$.subscribe((changeTab) => {
      if (changeTab) {
        this._fetchStatistics();
      }
    });
  }

  private _fetchStatistics(): void {
    const currentYearMonth: string = getStatisticsDate();

    this.isLoading = true;

    const subscription = this._gateway.fetchStatistics(this.activeTab(), currentYearMonth).subscribe({
      next: (statistics: TStatistics): void => {
        this.statistics.set(statistics);
      },
      complete: (): void => {
        this.isLoading = false;
      },
    });

    this._destroyRef.onDestroy((): void => {
      subscription.unsubscribe();
    });
  }
}
