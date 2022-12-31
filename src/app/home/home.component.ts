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

  constructor(private user: UsermgmService, private route: Router) { }

  ngOnInit(): void {
    // this.viewSingleBlog()
    this.viewAllBlogs()
  }
  clear: any;
  dataa:any;
  delete:any;
  searchBlog:any
  async logout() {
    // localStorage.clear();
    const data = await (await this.user.userlogOut()).subscribe((data) => {
      this.clear = data;
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

  viewAllBlogs(){
  this.user.viewAllBlog().then((result)=>{
    result.subscribe((res:any)=>{
      this.dataa=res.data

    })
  })
  }
  // async deleteUser(){
  //   await (await this.user.deleteUserAcc()).subscribe((data) => {
  //     this.route.navigate([''])
  //       console.log("sonuuu",data)
  //   })
  // }

  deleteUser() {
    Swal.fire({
      title: 'Are you sure want to delete ?',
      text: 'You will not be able to recover it',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then(async (result) => {
      if (result.value) {
        var resdelete = await (await this.user.deleteUserAcc()).subscribe((data) => {
            })
        Swal.fire(
          'Deleted!',
          'Your user file has been deleted.',
          'success'
        )
        this.route.navigate(['']);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your Account is Safe ..',
          'error'
        )
      }
    });
  }
}


