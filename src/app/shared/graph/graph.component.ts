import {
  AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostBinding, inject, Input, OnDestroy, ViewChild,
} from '@angular/core';

import {
  ArcElement, BarController, BarElement, CategoryScale, Chart, ChartType, DoughnutController,
  Legend, LinearScale, Title, Tooltip,
} from 'chart.js';

@Component({
  selector: 'app-graph',
  standalone: true,
  templateUrl: './graph.component.html',
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
  @Input({ required: false }) width?: string;
  @Input({ required: false }) height?: string;

  protected _chart!: Chart;

  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  @HostBinding('style') get hostStyles(): Record<string, string | undefined> {
    return {
      width: this.width,
      height: this.height,
      'max-height': this.height,
    };
  }

  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  ngAfterViewInit(): void {
    Chart.register(
      CategoryScale, LinearScale, BarController, BarElement, DoughnutController, ArcElement,
      Title, Tooltip, Legend
    );

    const canvas = this.chartCanvas.nativeElement;
    if (canvas) {
      if (this.width) {
        canvas.style.width = this.width;
      }
      if (this.height) {
        canvas.style.height = this.height;
      }

      this._chart = new Chart(canvas, {
        type: this.chartType, // Graph type
        data: {
          labels: this.labels, // Descriptions for axis
          datasets: [
            {
              label: this.label,
              data: this.data, // Data for the chart
              backgroundColor: this.colors, // Colors for columns ['#4a52b2', '#646cd6', '#ff6384', '#ff9f40']
              borderWidth: 1,
              maxBarThickness: 200,
            },
          ],
        },
        options: {
          responsive: false,
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
