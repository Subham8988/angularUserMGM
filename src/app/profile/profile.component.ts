import { UsermgmService } from './../usermgm.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl ,Validators} from '@angular/forms';
import Swal from "sweetalert2";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userupdate!: FormGroup
  dataa: any;
    imageSrc!: string;
   myForm = new FormGroup({
    blog_tittle: new FormControl('', [Validators.required, Validators.minLength(3)]),
    blog_category: new FormControl('', [Validators.required]),
    blog_img: new FormControl('', [Validators.required]),
    blog_content: new FormControl('',[Validators.required])
  });

  constructor(private service: UsermgmService) { }

  userDeatilData: any
  userdata: any
  ngOnInit(): void {
    this.userDeatil();
    this.userupdate = new FormGroup({
      designation: new FormControl(),
      phone: new FormControl(),
      mobile: new FormControl(),
      address: new FormControl(),
      web: new FormControl(),
      git: new FormControl(),
      twitter: new FormControl(),
      insta: new FormControl(),
      facebook: new FormControl(),
    })
    this.viewSingleBlog()
  }
  userDeatil() {
    this.service.userDetails().then((result) => {
      result.subscribe((data) => {
        this.userDeatilData = data
        console.log("user details", this.userDeatilData);

        if (this.userDeatilData.status == 200) {
          this.userdata = this.userDeatilData.userDetils
          this.userupdate.patchValue(this.userDeatilData.userDetils)
        }
        else {
          alert('error');
        }

      })
    })
  }

  dataaa: any
  userUpdate() {
    const updatedData = this.userupdate.value;
    console.log("value ", updatedData);
    this.service.userProfileUpdate(updatedData).then((result) => {
      result.subscribe((data) => {
        console.log(data);
        this.dataaa = data
        if (this.dataaa.status == 200) {
          Swal.fire({
            icon: 'success',
            text: this.dataaa.msg
          })
        }
      })
    })
  }

  viewSingleBlog() {
    this.service.viewSingleBlg().then((result) => {
      result.subscribe((res: any) => {
        this.dataa = res.data
        console.log("sonu", this.dataa)
      })
    })
  }

  blogEdit(userEditId:any)
  {
    // debugger
    console.log('id',userEditId);
      const editedData = this.myForm.value;
      Swal.fire({
        title: 'Are you sure want to edit ?',
        text: 'Your data will be update',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, edit it!',
        cancelButtonText: 'No, keep it'
      }).then(async (result) => {
        if (result.value) {
          var resEdit = await this.service.userEdit(userEditId, editedData);
          console.log('resedit',resEdit);
          Swal.fire(
            'Edited!',
            'Your blog has been edited.',
            'success'
          )
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Your blog is safe',
            'error'
          )
        }
      });
  }

  async blogDelete(_id:any){
  await (await this.service.deleteSingleBlog(_id)).subscribe(()=>{
  })
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
  }

blogViewData:any= {}
userViewData:any
userViewDataLength:any;
  userBlogData:any
  userBlogDataObj:any;
    async blogView(userId: any) {
      (await this.service.userView(userId)).subscribe((data)=>{
        console.log('data',data);
        this.userBlogData=data;
        this.userBlogDataObj=this.userBlogData.data
        console.log('ddd',this.userBlogDataObj);
        this.myForm.patchValue(this.userBlogDataObj)
      })
    }
}
