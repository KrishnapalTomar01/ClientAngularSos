import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import {Post} from '../shared/post';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';

@Injectable()
export class AddpostService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }
  
  getPosts(): Observable<Post[]> {
      return this.http.get(baseURL + 'addpost')
      .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

  addPost(post:any):Observable<any>{
    return this.http.post(baseURL + 'addpost', post)
    .map(res=>{
      return {'success':true};
    })
    .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

  getMyPosts(): Observable<Post[]>{
     return this.http.get(baseURL+'addpost/myposts')
     .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

  deletePost(id:string):Observable<any>{
    return this.http.delete(baseURL+'addpost/'+id)
    .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }
   
  editPost(id:string,post:any):Observable<any>{
    return this.http.put(baseURL+'addpost/'+id,post)
    .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

  getPost(id:string):Observable<any>{
    return  this.http.get(baseURL + 'addpost/'+ id)
                    .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }
    
}
