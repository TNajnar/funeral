import {
  AfterViewInit, ChangeDetectorRef, Component, ElementRef, inject, Input, OnDestroy, ViewChild,
} from '@angular/core';

import {
  ArcElement, BarController, BarElement, CategoryScale, Chart, ChartType, DoughnutController,
  Legend, LinearScale, Title, Tooltip,
} from 'chart.js';

@Component({
  selector: 'app-graph',
  standalone: true,
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.css',
  host: {
    class: 'flex flex-col justify-center items-center'
  },
})
export class GraphComponent implements AfterViewInit, OnDestroy {
  @Input({ required: true }) data!: number[];
  @Input({ required: true }) labels!: string[];
  @Input({ required: true }) label!: string;
  @Input({ required: false }) chartType: ChartType = 'bar';
  @Input({ required: false }) colors?: string[];

  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  protected _chart!: Chart;

  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  ngAfterViewInit(): void {
    Chart.register(
      CategoryScale, LinearScale, BarController, BarElement, DoughnutController, ArcElement,
      Title, Tooltip, Legend
    );

    const canvas = this.chartCanvas.nativeElement;
    if (canvas) {
      this._chart = new Chart(canvas, {
        type: this.chartType, // Typ grafu
        data: {
          labels: this.labels, // Popisky pro osy
          datasets: [
            {
              label: this.label,
              data: this.data, // Data pro graf
              backgroundColor: this.colors, // Barvy pro sloupce ['#4a52b2', '#646cd6', '#ff6384', '#ff9f40']
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              labels: {
                font: {
                  size: 14,
                  family: 'Arial',
                  weight: 'bold',
                },
              },
            },
          },
        // scales: {
        //   y: {
        //     display: false,
        //     beginAtZero: true,
        //     grid: {
        //       display: false,
        //     },
        //   },
        //   x: {
        //     display: false,
        //     grid: {
        //       display: false,
        //     },
        //   },
        // },
        },
      });
      this.cdr.detectChanges();
    }
  }

  ngOnDestroy(): void {
    if (this._chart) {
      this._chart.destroy();
    }
  }
}
