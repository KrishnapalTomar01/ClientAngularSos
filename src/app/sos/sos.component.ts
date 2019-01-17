import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material';
import { SosService } from 'app/services/sos.service';
declare var google: any;
export interface SOS{
  name: string;
  disasterType:string;
  latitude:number;
  longitude:number;
  phone:string;
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
  latitude:number;
  longitude:number;
  geocoder;
  
  constructor(private fb: FormBuilder,public dialogRef: MatDialogRef<SosComponent>,private ngZone: NgZone,
    private sosService:SosService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.sFormGroup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25),Validators.pattern ]],
      disastertype: ['',[Validators.required]],
      phone: ['', [Validators.required, Validators.pattern ]]
    });
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=>{
        this.latitude=position.coords.latitude; 
        this.longitude=position.coords.longitude; 
        this.displayLocation(position.coords.latitude,position.coords.longitude);
       });
       
      }
  }
  onSubmit(){
      this.sos= {
         name:this.sFormGroup.get("name").value,
         disasterType:this.sFormGroup.get("disastertype").value,
         phone:this.sFormGroup.get("phone").value,
         latitude:this.latitude,
         longitude:this.longitude   
      }
      if(this.latitude!=undefined){
      console.log(this.sos);
      this.sosService.postMessage(this.sos).subscribe(res=>{
        console.log(res)
      },err=>console.log(err));
      this.dialogRef.close(); 
      alert("Successfully sent request...");
      }
      else{
        alert("Turn On location");
      }
  }
   displayLocation(lat,long){
    this.geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(lat, long);

    this.geocoder.geocode(
        {'latLng': latlng}, 
        function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    var add= results[0].formatted_address ;
                    var  value=add.split(",");

                    var count=value.length;
                    var country=value[count-1];
                    var state=value[count-2];
                    var city=value[count-3];
                    console.log("city name is: " +city+" country: "+country+" state: "+state);
                    console.log("add= "+add);
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
   }

}
