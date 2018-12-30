import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { baseURL } from '../shared/baseurl';

export interface register{
  name: string;
  uname: string;
  password:string;
  email:string;
  phone:string;
  location:string
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
  location:string;
  user = {username: '', password: '', remember: false};
  errMess: string;
  constructor(private fb: FormBuilder,public dialogRef: MatDialogRef<LoginComponent>,
    private authService: AuthService, public http:HttpClient) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.rFormGroup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25) ]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(25) ]],
      uname: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(25) ]],
      phone: ['', [Validators.required, Validators.pattern ]],
      email: ['', [Validators.required, Validators.email ]],
    });
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=>{
        this.location="Latitude: " + position.coords.latitude + 
        " Longitude: " + position.coords.longitude; 
       });
      }
  }

  loginbtn(){
     this.login=true;
  }
  registerbtn(){
    this.login=false;
  }
  onSubmit() {
    console.log("User: ", this.user);
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
      uname:this.rFormGroup.get("uname").value,
      phone:this.rFormGroup.get("phone").value,
      email:this.rFormGroup.get("email").value,
      location:this.location   
   }
   console.log(this.reg);
    
   this.dialogRef.close(); 
  }
}