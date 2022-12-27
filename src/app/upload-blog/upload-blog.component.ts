import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from "sweetalert2";
import { HttpClient } from '@angular/common/http';
import { UsermgmService } from './../usermgm.service'
@Component({
  selector: 'app-upload-blog',
  templateUrl: './upload-blog.component.html',
  styleUrls: ['./upload-blog.component.scss']
})
export class UploadBlogComponent {
  imageSrc!: string;
   myForm = new FormGroup({
    blog_tittle: new FormControl('', [Validators.required, Validators.minLength(3)]),
    blog_category: new FormControl('', [Validators.required]),
    file: new FormControl('', [Validators.required]),
    blog_content: new FormControl('',[Validators.required])
  });
  constructor(private http: HttpClient,private service: UsermgmService) { }
 
  ngOnInit(): void {
  }
  get f(){
  return this.myForm.controls;
  }
   
  onFileChange(event:any) {
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.myForm.patchValue({
          fileSource: reader.result
        });
      };
    }
  }
   
  async submit(){
    let bodydata = this.myForm.value
    let res = await this.service.uploadBlog(bodydata);
    console.log('res');
    
    // let res =(await this.service.uploadBlog(bodydata)).subscribe((data: any) => {
    //   alert('Uploaded Successfully.');
    //   console.log("sdjdhasgdj", res);
    // })
    //     console.log("hello",bodydata);
  }
}


