import Swal from "sweetalert2";
import { UsermgmService } from './../usermgm.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userLogin: any;
  password: any;
  show = false;
  constructor(private service: UsermgmService, private route: Router) { }

  ngOnInit(): void {
    this.userLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })

    this.password = 'password';
  }
  userdata: any

  logIn() {
    const userLogInData = this.userLogin.value;
    this.service.userlogin(userLogInData).then((result) => {
      (result.subscribe((data) => {
        this.userdata = data;
        if (this.userdata.status == 200) {
          localStorage.setItem('token', this.userdata.token)
          console.log("userlogin", this.userdata);

          this.route.navigate(['home'])
        }
        if (this.userdata.status == 204) {
          Swal.fire({
            icon: 'error',
            title: this.userdata.msg
          })
        }

      }));
    }).catch((err: any) => {
      alert("errere")
    });
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
