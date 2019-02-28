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
  months:string[]=['Jan','Feb','March','April','May','June','July','Aug','Sept','Oct','Nov','Dec'];
  selectedElement:  any = undefined;
  errMess:string;
  constructor(private statisticsservice:StatisticsService) { }

  ngOnInit() {
      this.statisticsservice.getTotalCounts().subscribe(stats=>this.statsTotal=stats,
        err=>this.errMess=<any>err);
  }

  showTable(child): void {
    if (this.selectedElement && this.selectedElement._id.city == child._id.city && this.selectedElement._id.state==child._id.state) {
      this.selectedElement = undefined;
    } else {
      this.selectedElement = child;
    }
  }

}
