import { Component, OnInit } from '@angular/core';
import {SosService} from '../services/sos.service';
import {Sos} from '../shared/sos';
import { flyInOut, expand } from '../animations/app.animation';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class NotificationComponent implements OnInit {
  messages:Sos[];
  errMess:string;
  constructor(private sosservice:SosService) { }

  ngOnInit() {
    this.getNotification();
  }
  
  getNotification(){
    this.sosservice.getNotifications().subscribe(messages=>{this.messages=messages},
      errMess=>this.errMess=<any>errMess);
  }

  rescue(id:string){
    let post={
      'rescue':true
    }
    this.sosservice.rescuePeople(id,post).subscribe(res=>{console.log(res); this.getNotification()},errMess=>this.errMess=errMess);
  
  }
}
