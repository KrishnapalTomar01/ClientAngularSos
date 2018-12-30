import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material';

export interface SOS{
  name: string;
  disasterType:string;
  location:string;
}
@Component({
  selector: 'app-sos',
  templateUrl: './sos.component.html',
  styleUrls: ['./sos.component.scss']
})

export class SosComponent implements OnInit {
  disasters:string[]=['Flood','Landslide','Forest Fire','Earthquake','Other'];
  sFormGroup: FormGroup;
  sos: SOS;
  location:string;
  constructor(private fb: FormBuilder,public dialogRef: MatDialogRef<SosComponent>,) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.sFormGroup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25) ]],
      disastertype: ['',[Validators.required]],
    });
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=>{
        this.location="Latitude: " + position.coords.latitude + 
        " Longitude: " + position.coords.longitude; 
       });
      }
  }
  onSubmit(){
       
      this.sos= {
         name:this.sFormGroup.get("name").value,
         disasterType:this.sFormGroup.get("disastertype").value,
         location:this.location   
      }
      console.log(this.sos);
       
      this.dialogRef.close(); 
  }


}
