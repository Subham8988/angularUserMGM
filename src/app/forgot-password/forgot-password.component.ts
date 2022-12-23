import  Swal  from 'sweetalert2';
import { FormGroup, FormControl } from '@angular/forms';
import { UsermgmService } from './../usermgm.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgetPassword:any
  constructor(private service:UsermgmService) { }

  ngOnInit(): void {
    this.forgetPassword =new FormGroup({
      email: new FormControl()
    })
  }

  forget_password_res:any
 async resetLink()
  {
    const data = this.forgetPassword.value
    const email=data['email']
    console.log(data);
   (await this.service.forgetpassword_link(data)).subscribe((data)=>{
    console.log(data);
    this.forget_password_res=data
   if(this.forget_password_res.status==200)
   {
  Swal.fire({
 icon:'success',
 text:this.forget_password_res.message+ " " +email
  })
   }
  if(this.forget_password_res.status==404)
  {
    Swal.fire({
      icon:'error',
      text: this.forget_password_res.message+" "+ email
       })
  }


   })
  }
}
