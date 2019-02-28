import { Component, OnInit } from '@angular/core';
import {StatisticsService} from '../services/statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  displayedColumns: string[] = ['State', 'City', 'Total Victims', 'Victims Rescued'];
  statsTotal:any[];
  errMess:string;
  constructor(private statisticsservice:StatisticsService) { }

  ngOnInit() {
      this.statisticsservice.getTotalCounts().subscribe(stats=>this.statsTotal=stats,
        err=>this.errMess=<any>err);
  }

}
