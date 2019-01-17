import { Component, OnInit,Inject, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { baseURL } from '../shared/baseurl';
import {AddpostService} from '../services/addpost.service';
import {Post} from '../shared/post';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.scss']
})
export class EditpostComponent implements OnInit {
  post:Post;
  errMess:string;
  oldImage:string;
  newImage:string;
  sFormGroup: FormGroup;
  newPost={caption:'',text:'',image:''};
  public uploader:FileUploader = new FileUploader({url: baseURL+'imageUpload', itemAlias: 'photo'});
  constructor(@Inject('BaseURL') private BaseURL,private addpostservice:AddpostService,private route: ActivatedRoute,
  private fb: FormBuilder,private location:Location) { }

  ngOnInit() {
    this.sFormGroup = this.fb.group({
      caption: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
      text: ['',[Validators.required, Validators.minLength(6)]]
    });
    this.route.params
      .switchMap((params: Params) => { return this.addpostservice.getPost(params['id']); })
      .subscribe(post => { 
          this.post = post;
          this.oldImage=post.image; 
          this.sFormGroup.setValue({'caption':this.post.caption,'text':this.post.text});
        },
        errmess => this.errMess = <any>errmess);
        this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
        this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
             console.log("ImageUpload:uploaded:", item, status, response);
             var obj = JSON.parse(response, (key, value)=> {
               if (key == "filename") {
                 this.newImage=value;
                 this.oldImage=undefined;
               } 
             });
 
        };
     

  }

  onSubmit(){
    if(this.newImage){
      this.newPost.caption=this.sFormGroup.get("caption").value;
     
      this.newPost.text=this.sFormGroup.get("text").value;
      this.newPost.image=this.newImage;
      this.addpostservice.editPost(this.post._id,this.newPost).subscribe((res)=>{
         console.log(res);
         this.goBack();
      },err=>console.log(err));
   }else{
    this.addpostservice.editPost(this.post._id,this.sFormGroup.value).subscribe((res)=>{
       console.log(res);
       this.goBack();
    },err=>console.log(err));
   }
  }

  goBack(){
    this.location.back();
  }

}
