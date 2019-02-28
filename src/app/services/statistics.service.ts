import { Injectable } from '@angular/core';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
@Injectable()
export class StatisticsService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getTotalCounts():Observable<any[]>{
    return this.http.get(baseURL + 'statistics')
    .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }
}
