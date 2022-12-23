import { ProfileComponent } from './profile/profile.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { UploadBlogComponent } from './upload-blog/upload-blog.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
  path:'',
  component:LoginComponent
  },
  {
    path:'registerartion',
    component:RegistrationComponent
  },
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'resetPassword',
    component:ForgotPasswordComponent
  },
  {
    path:"profile",
    component:ProfileComponent
  },
  {
    path:"upload-blog",
    component:UploadBlogComponent
  },
  {
    path:"#",
    component:LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
