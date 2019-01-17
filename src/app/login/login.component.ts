import { Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { baseURL } from '../shared/baseurl';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';

export interface register{
  name: string;
  username: string;
  password:string;
  email:string;
  phone:string;
  address:string,
  city:string,
  state:string
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login=true;
  rFormGroup: FormGroup;
  reg: register;
  user = {username: '', password: '', remember: false};
  errMess: string;
  constructor(private fb: FormBuilder,public dialogRef: MatDialogRef<LoginComponent>,
    private authService: AuthService, public http:HttpClient, @Inject(SESSION_STORAGE) private storage: StorageService) { }

  ngOnInit() {
    this.createForm();
    if(this.storage.get('username')!=null){
          this.user.username=this.storage.get('username');
          this.user.password=this.storage.get('password');
    }
  }

  createForm() {
    this.rFormGroup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25),Validators.pattern ]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25) ]],
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(25), Validators.pattern ]],
      phone: ['', [Validators.required, Validators.pattern ]],
      email: ['', [Validators.required, Validators.email ]],
      address:['',[Validators.required,,Validators.minLength(7)]],
      city:['',[Validators.required,Validators.minLength(3)]],
      state:['',[Validators.required,Validators.minLength(3)]]
    });
  }

  getErrorEmail(){
    return this.rFormGroup.get('email').hasError('required') ? 'You must enter a value' :
    this.rFormGroup.get('email').hasError('email') ? 'Not a valid email':'';
  }

  loginbtn(){
     this.login=true;
  }
  registerbtn(){
    this.login=false;
  }
  onSubmit() {
    console.log("User: ", this.user);
    if(this.user.remember){
      this.storage.set('username',this.user.username);
      this.storage.set('password',this.user.password);
    }else{
      this.storage.remove('username');
      this.storage.remove('password');
    }
    this.authService.logIn(this.user)
      .subscribe(res => {
        if (res.success) {
          this.dialogRef.close(res.success);          
        }
        else {
          console.log(res);
        }
      },
      error => {
        console.log(error);
        this.errMess = error
      });
  }  
  
  onSubmitRegister(){
    this.reg= {
      name:this.rFormGroup.get("name").value,
      password:this.rFormGroup.get("password").value,
      username:this.rFormGroup.get("username").value,
      phone:this.rFormGroup.get("phone").value,
      email:this.rFormGroup.get("email").value,
      address:this.rFormGroup.get("address").value,
      city:this.rFormGroup.get("city").value,
      state:this.rFormGroup.get("state").value 
   }
   console.log(this.reg);
   this.authService.signUp(this.reg)
   .subscribe(res=>{
     if(res.success){
       this.dialogRef.close(res.success);
     }
     else{
       console.log(res);
       this.errMess=res.err;
     }
   },
   error=>{
     console.log(error);
     this.errMess=error;
   }) 
  }
}