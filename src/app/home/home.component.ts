
import { Component, OnInit, Inject } from '@angular/core';

import { Post } from '../shared/post';
import { AddpostService } from '../services/addpost.service';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
  '[@flyInOut]': 'true',
  'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class HomeComponent implements OnInit {
  posts: Post[];
  errMess: string;
  constructor(private postService: AddpostService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.postService.getPosts()
     .subscribe(posts=>this.posts=posts,
     errMess=>this.errMess=<any>errMess)
  }

}