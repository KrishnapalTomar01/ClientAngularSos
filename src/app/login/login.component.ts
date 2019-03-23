import { Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { baseURL } from '../shared/baseurl';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
declare var google: any;

export interface register{
  name: string;
  username: string;
  password:string;
  email:string;
  phone:string;
  address:string,
  city:string,
  state:string,
  latitude:number,
  longitude:number
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
  show=true;
  isChecked = false;
  user = {username: '', password: '', remember: false};
  errMess1: string;
  errMess2:string;
  latitude:number;
  longitude:number;
  geocoder;
  city:string;
  state:string;
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
      state:['',[Validators.required,Validators.minLength(3)]],
      location:[false]
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
        this.errMess1 = error
      });
  }  
  onChkChange(){
      if(this.isChecked){
         this.show=false;
         if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position)=>{
            this.latitude=position.coords.latitude; 
            this.longitude=position.coords.longitude; 
            /*this.displayLocation(position.coords.latitude,position.coords.longitude);*/
            this.geocoder = new google.maps.Geocoder();
            var latlng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
        
            this.geocoder.geocode(
                {'latLng': latlng}, 
                (results, status) =>{
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[0]) {
                            var add= results[0].formatted_address ;
                            var  value=add.split(", ");
        
                            var count=value.length;
                            var country=value[count-1];
                            this.state=value[count-2];
                            this.city=value[count-3];
                            console.log("city name is: " +this.city+" country: "+country+" state: "+this.state);
                            console.log("add= "+add);
                            this.rFormGroup.patchValue({'address':add,'city':this.city,'state':this.state})
                        }
                        else  {
                            console.log("address not found");
                        }
                    }
                    else {
                        console.log("Geocoder failed due to: " + status);
                    }
                }
            );
           });
           
          }
      }else{
        this.show=true;
      }

  }

  onSubmitRegister(){
    if(!this.isChecked){
      this.geocoder = new google.maps.Geocoder();
      let address=this.rFormGroup.get('address').value+' ,'+this.rFormGroup.get('city').value+', '+this.rFormGroup.get('state').value;
      this.geocoder.geocode( { 'address': address},(results, status)=> {
        if (status == google.maps.GeocoderStatus.OK) {
          this.latitude = results[0].geometry.location.lat();
          this.longitude = results[0].geometry.location.lng();
          this.reg= {
            name:this.rFormGroup.get("name").value,
            password:this.rFormGroup.get("password").value,
            username:this.rFormGroup.get("username").value,
            phone:this.rFormGroup.get("phone").value,
            email:this.rFormGroup.get("email").value,
            address:this.rFormGroup.get("address").value,
            city:this.rFormGroup.get("city").value,
            state:this.rFormGroup.get("state").value,
            latitude:this.latitude,
            longitude:this.longitude 
         }
        } 
      }); 
    }else{
    this.reg= {
      name:this.rFormGroup.get("name").value,
      password:this.rFormGroup.get("password").value,
      username:this.rFormGroup.get("username").value,
      phone:this.rFormGroup.get("phone").value,
      email:this.rFormGroup.get("email").value,
      address:this.rFormGroup.get("address").value,
      city:this.rFormGroup.get("city").value,
      state:this.rFormGroup.get("state").value,
      latitude:this.latitude,
      longitude:this.longitude 
    }
   }
   console.log(this.reg);
   this.authService.signUp(this.reg)
   .subscribe(res=>{
     if(res.success){
       alert("Successfully registered...");
       this.dialogRef.close(res.success);
     }
     else{
       console.log(res);
       this.errMess2=res.err;
     }
   },
   error=>{
     console.log(error);
     this.errMess2=error;
   }) 
  }
}