import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from "sweetalert2";

@Component({
  selector: 'app-upload-blog',
  templateUrl: './upload-blog.component.html',
  styleUrls: ['./upload-blog.component.scss']
})
export class UploadBlogComponent implements OnInit {
  // registerForm: any = FormGroup;
  submitted = false;
  constructor() { }
  registerForm =  new FormGroup({
    imageInput: new FormControl('', Validators.required),
  });
  ngOnInit(): void {
  }
  // get f() { return this.registerForm.controls; }
  onSubmit() {

    this.submitted = true;
    // stop here if form is invalid
    // if (this.registerForm.invalid) {
    //   // return;
    //     setTimeout(() => {
    //       Swal.fire({
    //         icon: "success",
    //         text: "Your Activity With ActivityId",
    //         title: "Edited SuccessFully"
    //       });
    //     }, 1500);
    //   }
    //   else {
    //     setTimeout(() => {
    //       Swal.fire({
    //         icon: "error",
    //         title: 'Error Code',
    //         text: "failed",
    //       });
    //     }, 1500);
    //   }
    }
    //True if all the fields are filled 
    // if (this.submitted) {
    //   alert("Great!!");
    // }


  //file type validation
  onImageChangeFromFile($event: any) {

    if ($event.target.files && $event.target.files[0]) {
      let file = $event.target.files[0];
      console.log(file);
      if (file.type == "text/xml") {
        console.log("correct");
      }
      else {
        //call validation
        this.registerForm.reset();
        // this.registerForm.controls["imageInput"].setValidators([Validators.required]);
        // this.registerForm.get('imageInput').updateValueAndValidity();
      }
    }
  }

}


