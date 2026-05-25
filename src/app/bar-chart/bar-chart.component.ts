import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ShareDataService } from '../share-data.service';

@Component({
    selector: 'app-bar-chart',
    templateUrl: './bar-chart.component.html',
    styleUrls: ['./bar-chart.component.css'],
    standalone: false
})
export class BarChartComponent {

  // @Input() runningCounts:any;
  // @Input() closedCounts:any;
  // @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  
  constructor() { }

  ngOnInIt(){ }

  // public barChartOptions: ChartConfiguration['options'] = {
  //   responsive: true,
  //   scales: {
  //     x: {
  //       grid: {
  //         offset: true
  //       }
  //     },
  //     y: {
  //       min: 0
  //     }
  //   },
  //   plugins: {
  //     legend: {
  //       display: true,
  //     },
  //     datalabels: {
  //       anchor: 'end',
  //       align: 'end'
  //     }
  //   }
  // };
  // public barChartType: ChartType = 'bar';
  // public barChartPlugins = [
  //   ChartDataLabels
  // ];

  // public barChartData: ChartData<'bar'> = {
  //   labels: ['STR', 'FIN', 'QLT', 'MAN', 'STO', 'HR'],
  //   datasets: [
  //     { data: [1,7,3,5,8], label: 'Total', borderRadius: 20, maxBarThickness: 12, backgroundColor: 'rgba(25, 103, 210)', },
  //     { data: [2,0,2,6,4], label: 'Closed', borderRadius: 20, maxBarThickness: 12, backgroundColor: 'rgba(14, 153, 64)' }
  //   ]
  // };  
}

