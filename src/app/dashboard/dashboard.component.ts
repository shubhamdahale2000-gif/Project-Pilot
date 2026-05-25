import { Component, ViewChild } from '@angular/core';
import { projectData } from '../projectData.model';
import { ShareDataService } from '../share-data.service';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    standalone: false
})
export class DashboardComponent {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  runningCounts: any;
  closedCounts: any;
  departmentCounts: any;
  allStatusData: any = {};
  allProjectData: projectData[] = [];
  closureDelayCount: number = 0;
  counts: any;
  barChartData: any;

  tempGetStatusData: Subscription | undefined ;
  tempGetProjectList: Subscription | undefined;

  constructor(private shareDataService: ShareDataService) { }

  ngOnInit() {
    this.getStatusData();
    this.getDashboardData();
  }

  ngOnDestroy(){
    if(this.tempGetStatusData){
      this.tempGetStatusData.unsubscribe()
    };
    if(this.tempGetProjectList){
      this.tempGetProjectList.unsubscribe()
    }
  }

  // api call to get status count
  getStatusData() {
    this.tempGetStatusData = this.shareDataService.getStatusData().subscribe((res: any) => {
      const statusCount = JSON.stringify(res['occurrences']);
      this.allStatusData = JSON.parse(statusCount);
    })
  }

  // to get closure count and bar chart inputs
  getDashboardData() {
    this.tempGetProjectList = this.shareDataService.getProjectList().subscribe(res => {
      this.allProjectData = res;
      const today = new Date();
      const runningObjects = this.allProjectData.filter(obj => obj.status === "Running" && new Date(obj.endDate) < today);
      this.closureDelayCount = runningObjects.length;

      // to get status count for bar chart
      this.departmentCounts = this.allProjectData.reduce((counts: any, departmentData) => {
        const { department, status } = departmentData;
        if (!counts[department]) {
          counts[department] = { Registered: 0, Closed: 0 };
        }
        counts[department][status]++;
        return counts;
      }, {});
      this.runningCounts = Object.values(this.departmentCounts).map((departmentObj: any) => departmentObj.Registered);
      this.closedCounts = Object.values(this.departmentCounts).map((departmentObj: any) => departmentObj.Closed);
      this.getDataForChart();
    })
  }

  // to get bar chart
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {
        grid: {
          offset: true
        }
      },
      y: {
        min: 0
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    ChartDataLabels
  ];

  getDataForChart() {
    this.barChartData = {
      labels: ['STR', 'FIN', 'QLT', 'MAN', 'STO', 'HR'],
      datasets: [
        { data: this.runningCounts, label: 'Total', borderRadius: 20, maxBarThickness: 12, backgroundColor: 'rgba(25, 103, 210)' },
        { data: this.closedCounts, label: 'Closed', borderRadius: 20, maxBarThickness: 12, backgroundColor: 'rgba(220,53,69)' }
      ]
    };
  }
}
