import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UsermgmService } from '../usermgm.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private user: UsermgmService, private route: Router,) { }

  ngOnInit(): void {
  }
  clear: any;
  async logout() {
    // localStorage.clear();

    const data = await (await this.user.userlogOut()).subscribe((data) => {
      this.clear = data;
      console.log("sadada", this.clear);
      if (this.clear.status == 'sucess') {
        localStorage.clear();
        Swal.fire({
          icon: 'success',
          title: 'Logout Sucessfully'
        }).then((result: any) => {
          this.route.navigate([''])
        })
      }
      else {
        Swal.fire({
          icon: 'error',
          title: "Something Went wrong"
        })
      }
    })

  }
}
