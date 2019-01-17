import { Component, OnInit,Inject,ViewChild } from '@angular/core';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { baseURL } from '../shared/baseurl';
import {AddpostService} from '../services/addpost.service';
import {Post} from '../shared/post';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.scss']
})
export class AddpostComponent implements OnInit {
  @ViewChild('pform') postFormDirective;
  posts:Post[];
  errMess:string;
  image:string;
  sFormGroup: FormGroup;
  public uploader:FileUploader = new FileUploader({url: baseURL+'imageUpload', itemAlias: 'photo'});
  constructor(@Inject('BaseURL') private BaseURL,private addpostservice:AddpostService,private fb: FormBuilder) { }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
       this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
            console.log("ImageUpload:uploaded:", item, status, response);
            var obj = JSON.parse(response, (key, value)=> {
              if (key == "filename") {
                this.image=value;
              } 
            });

       };
    
    this.sFormGroup = this.fb.group({
        caption: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
        text: ['',[Validators.required, Validators.minLength(6)]],
        image:[undefined]
    });
    this.getPosts();
  }

  getPosts(){
    this.addpostservice.getMyPosts().subscribe(posts=>{this.posts=posts},
      errMess=>this.errMess=<any>errMess);
  }
  onSubmit(){
      if(this.image)
      this.sFormGroup.patchValue({'image':this.image});
      this.addpostservice.addPost(this.sFormGroup.value).subscribe((res)=>{
           console.log(res);
           this.getPosts();
      },err=>console.log(err));
      this.sFormGroup.reset({
        image:undefined,
        caption:'',
        text:''
      });
      this.postFormDirective.resetForm();
  }

  deletePost(id:string){
    this.addpostservice.deletePost(id).subscribe(
      res=>console.log(res),err=>console.log(err)
    );
    this.getPosts();
  }
}
