import { Component, computed, DestroyRef, inject, OnInit, signal, Signal } from '@angular/core';
import { Observable } from 'rxjs';
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
        console.log('🚀 ~ WarehouseGraphComponent ~ subscription ~ statistics:', statistics);
        this.statistics.set(statistics);
        console.log('🚀 ~ WarehouseGraphComponent ~ subscription ~  this.statistics:',  this.statistics());
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
