import { UsermgmService } from './../usermgm.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import Swal from "sweetalert2";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userupdate!:FormGroup

  constructor(private service:UsermgmService) { }

  userDeatilData:any
  userdata:any
  ngOnInit(): void {
    this.userDeatil();
    this.userupdate =new FormGroup({
      designation:new FormControl(),
      phone:new FormControl(),
      mobile:new FormControl(),
      address:new FormControl(),
      web:new FormControl(),
      git:new FormControl(),
      twitter:new FormControl(),
      insta:new FormControl(),
      facebook:new FormControl(),

    })
  }
  userDeatil()
  {
  this.service.userDetails().then((result)=>{
    result.subscribe((data)=>{
       this.userDeatilData=data
       console.log("user details",this.userDeatilData);

       if(this.userDeatilData.status==200)
       {
         this.userdata=this.userDeatilData.userDetils
         this.userupdate.patchValue(this.userDeatilData.userDetils)
       }
       else{
        alert('error');
       }

    })
  })
  }


  dataaa:any
  userUpdate()
  {
 const updatedData= this.userupdate.value;
 console.log("value ",updatedData);
 this.service.userProfileUpdate(updatedData).then((result)=>{
  result.subscribe((data)=>{
    console.log(data);
this.dataaa=data
if(this.dataaa.status==200)
{
Swal.fire({
  icon:'success',
  text:this.dataaa.msg
})
}
  })
 })

  }

}
