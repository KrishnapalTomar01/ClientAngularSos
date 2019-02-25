import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Sos } from '../shared/sos';

import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
@Injectable()
export class SosService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

    postMessage(msg:any):Observable<any>{
      return this.http.post(baseURL + 'messages', msg)
      .map(res=>{
        return {'success':true};
      })
      .catch(error => { return this.processHTTPMsgService.handleError(error); });
    }

    getNotifications(): Observable<Sos[]>{
      return this.http.get(baseURL + 'notifications')
    .catch(error => { return this.processHTTPMsgService.handleError(error); });
    }

    rescuePeople(id:string,post:any):Observable<any>{
      return this.http.put(baseURL+'notifications/'+id,post)
      .catch(error => { return this.processHTTPMsgService.handleError(error); });
    }

}
