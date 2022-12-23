import { Router } from '@angular/router';
import { UsermgmService } from './../usermgm.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registere!: FormGroup
  imageUrl: any;
  password: any;
  show = false;
  constructor(private service: UsermgmService, private route: Router) { }
  ngOnInit(): void {
    this.registere = new FormGroup({
      name: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      conformpassword: new FormControl(),
      img: new FormControl(),
      tc: new FormControl()
    })
    this.password = 'password';
  }

  resData: any
  registerUser() {
    this.onLoad();
  }

  uploadFile(event: any) {
    this.imageUrl = event.target.files[0];
    this.onLoad();
  }

  imageFormData: any
  onLoad() {
    this.imageFormData = new FormData();
    // this.imageFormData.append('file', this.imageUrl, this.imageUrl.name);
    this.imageFormData.append('password', this.registere.value['password']);
    this.imageFormData.append('tc', this.registere.value['tc']);
    this.imageFormData.append('email', this.registere.value['email']);
    this.service.userRegister(this.imageFormData).then((data) => {
      data.subscribe((res) => {
        this.resData = res
        if (this.resData.status == 200) {
          Swal.fire({
            icon: 'success',
            title: 'Register Sucessfully'
          }).then((result: any) => {
            this.route.navigate([''])
          })
        }
      })
    })
  }
  onClick() {
    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }

}
