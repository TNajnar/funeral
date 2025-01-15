import { Component, computed, inject, OnDestroy, OnInit, signal, Signal } from '@angular/core';
import { combineLatest, Observable, Subject, takeUntil } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { MatTabsModule } from '@angular/material/tabs';

import { GraphComponent } from '@app/shared/graph/graph.component';
import { WarehouseGatewayService } from '../gateways/warehouse.gateway.service';
import { WarehouseService } from '../services/warehouse.service';
import {
  getStatisticsDate, getTotalMonthCategoryStats, detailMonthStats, getStatisticsTitle,
} from '../lib/utils';
import type { TStatistics } from '../lib/warehouse-control.gateway.model';
import type { TInitialMonthDetail } from '../lib/warehouse-control.model';
import { GRAPH_COLORS } from '../lib/consts';
import { warehouseControl } from '@lib/staticTexts';

@Component({
  selector: 'app-warehouse-graph',
  standalone: true,
  imports: [GraphComponent, MatTabsModule],
  templateUrl: './warehouse-graph.component.html',
})
export class WarehouseGraphComponent implements OnInit, OnDestroy {
  protected _texts = warehouseControl.graph;
  private _destroy$ = new Subject<void>();
  statistics = signal<TStatistics>({} as TStatistics);
  isLoading: boolean = false;

  private _warehouseService: WarehouseService = inject(WarehouseService);
  private _gateway: WarehouseGatewayService = inject(WarehouseGatewayService);

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
    combineLatest([this.activeTab$, this._warehouseService.onWarehouseTableChange$]).subscribe(
      ([tabChange, warehouseChange]) => {
        if (tabChange || warehouseChange) {
          this._fetchStatistics();
        }
      }
    );
  }

  get statisticsTitle(): string {
    return getStatisticsTitle();
  }

  get graphColors(): string[] {
    return GRAPH_COLORS;
  }

  private _fetchStatistics(): void {
    const currentYearMonth: string = getStatisticsDate();

    this.isLoading = true;

    this._gateway.fetchStatistics(this.activeTab(), currentYearMonth)
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (statistics: TStatistics): void => {
          this.statistics.set(statistics);
        },
        complete: (): void => {
          this.isLoading = false;
        },
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
