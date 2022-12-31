
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from "sweetalert2";
import { UsermgmService } from './../usermgm.service'
import { Router } from '@angular/router';
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
  constructor(private service: UsermgmService,private route: Router) { }

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


  updatedBlogDataRes:any
  async submit(){
    let bodydata = this.myForm.value
    console.log(this.myForm.value['blog_category']);
if(this.myForm.value['blog_category']==''||this.myForm.value['blog_tittle']==''||this.myForm.value['blog_content']=='')
{

  Swal.fire({
    icon:'warning',
    text:'Please Fill All Fields'
  })
}
else{
   var res = (await this.service.uploadBlog(bodydata)).subscribe((data)=>{
     this.updatedBlogDataRes =data;
     if(this.updatedBlogDataRes.status==200){
      Swal.fire({
        icon:'success',
        text:'You have succesfully upload your blog'
      }).then((result:any)=>{
this.route.navigate(['home'])
      })
     }
     else{
      Swal.fire({
        icon:'error',
        text:'Somethings Wents Wrong'
      })
     }
    })
}

  }
}


