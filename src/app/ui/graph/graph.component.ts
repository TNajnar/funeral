import { Component, Input, OnInit } from '@angular/core';

import {
  ArcElement, BarController, BarElement, CategoryScale, Chart, ChartType, DoughnutController,
  Legend, LinearScale, Title, Tooltip,
} from 'chart.js';

@Component({
  selector: 'app-graph',
  standalone: true,
  templateUrl: './graph.component.html',
  host: {
    class: 'flex flex-col justify-center items-center h-[20rem]'
  },
})
export class GraphComponent implements OnInit {
  @Input({ required: true }) data!: number[];
  @Input({ required: true }) labels!: string[];
  @Input({ required: true }) label!: string;
  @Input({ required: false }) chartType: ChartType = 'bar';
  @Input({ required: false }) colors?: string[];

  protected _chart!: Chart;

  ngOnInit(): void {
    Chart.register(
      CategoryScale, LinearScale, BarController, BarElement, DoughnutController, ArcElement,
      Title, Tooltip, Legend
    );

    this._chart = new Chart('my-chart', {
      type: this.chartType, // Bar chart type
      data: {
        labels: this.labels, // Labels for bars
        datasets: [
          {
            label: this.label,
            data: this.data, // Data for each bar
            backgroundColor: this.colors, //['#4a52b2', '#646cd6', '#ff6384', '#ff9f40']
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            // position: 'right',
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
  }
}
