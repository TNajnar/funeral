import { Component, computed, DestroyRef, inject, OnInit, signal, Signal } from '@angular/core';
import { combineLatest, Observable, of, switchMap, tap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { MatTabsModule } from '@angular/material/tabs';

import { GraphComponent } from '@app/shared/graph/graph.component';
import { WarehouseGatewayService } from '../gateways/warehouse.gateway.service';
import { WarehouseService } from '../services/warehouse.service';
import {
  getStatisticsDate, getCurrentMonthName, getTotalMonthCategoryStats, detailMonthStats
} from '../utils/utils';
import type { TStatistics } from '../utils/warehouse-control.gateway.model';
import { TInitialMonthDetail } from '../utils/warehouse-control.model';

@Component({
  selector: 'app-warehouse-graph',
  standalone: true,
  imports: [GraphComponent, MatTabsModule],
  templateUrl: './warehouse-graph.component.html',
})
export class WarehouseGraphComponent implements OnInit {
  statistics = signal<TStatistics>({} as TStatistics);
  currentMonthTitle: string = getCurrentMonthName();
  isLoading = false;

  private _warehouseService: WarehouseService = inject(WarehouseService);
  private _gateway: WarehouseGatewayService = inject(WarehouseGatewayService);
  private _destroyRef: DestroyRef = inject(DestroyRef);

  activeTab: Signal<number> = this._warehouseService.activeTab;
  activeTab$: Observable<number> = toObservable(this.activeTab);

  monthCategoryStatistics: Signal<number[]> = computed(() => {
    const { statistics } = this.statistics();

    const totalStats = getTotalMonthCategoryStats(statistics);

    return totalStats;
  });

  detailPurchasedStats: Signal<TInitialMonthDetail> = computed(() => {
    const { statistics } = this.statistics();

    const { inStock, purchased, sold } = detailMonthStats(statistics);

    return { inStock, purchased, sold };
  });

  ngOnInit(): void {
    combineLatest([this.activeTab$, this._warehouseService.warehouseItems$])
      .pipe(
        switchMap(([tabChange, warehouseChange]) => {
          if (tabChange || warehouseChange) {
            return this._fetchStatistics();
          }

          return of([]);
        })
      )
      .subscribe();
  }

  private _fetchStatistics(): Observable<TStatistics> {
    const currentYearMonth: string = getStatisticsDate();

    this.isLoading = true;

    return this._gateway.fetchStatistics(this.activeTab(), currentYearMonth).pipe(
      tap((statistics: TStatistics) => {
        this.statistics.set(statistics);
        this.isLoading = false;
      })
    );
  }
}
