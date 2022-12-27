import { environment } from './../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { EncryptionService } from './upload-blog/encryption-service/encryption.service';

@Injectable({
  providedIn: 'root'
})
export class UsermgmService {
  encryptionDomain: any;
  apiCaller: any;

  constructor(private http: HttpClient) { }

  public async userlogin(data: any) {
    return this.http.post(environment.baseurl + 'route/controller/user/login', data);
  }
  public async userRegister(data: any) {
    return this.http.post(environment.baseurl + 'route/controller/user/createUser', data)
  }
  public async forgetpassword_link(email: any) {
    return this.http.post(environment.baseurl + 'route/controller/user/passwordResetLink', email)
  }
  public async userDetails() {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', token);
    return this.http.get(environment.baseurl + 'route/middleware/controller/user/auth/user', { 'headers': headers })
  }

  public async userProfileUpdate(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', token);
    return this.http.post<any>(environment.baseurl + 'route/middleware/controller/user/auth/chngpassword', data, { 'headers': headers })
  }

  public async userlogOut() {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', token);
    return this.http.post(environment.baseurl + 'route/middleware/controller/user/auth/logout/' + token, '', { 'headers': headers })
  }

  public async uploadBlog(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', token);
    return this.http.post(environment.baseurl + 'route/middleware/controller/user/auth/User_Blog_Upload',data,{ 'headers': headers }).subscribe((data)=>{
      console.log('datata',data);
    })
  }

  public async viewAllBlog() {
    return this.http.get(environment.baseurl + 'route/controller/user/allBlog')
  }

  public async viewSingleBlg(){
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', token);
    return this.http.get(environment.baseurl + 'route/middleware/controller/user/auth/User_Blog_Get', { 'headers': headers })
  }

  public async deleteUserAcc(){
    const token:any= localStorage.getItem('token');
    const headers =new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization',token);
  return this.http.get(environment.baseurl + 'route/middleware/controller/user/auth/User_Delete',{ 'headers': headers })
  }

  public async deleteSingleBlog(_id:any){
    // debugger
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', token);
    return this.http.get(environment.baseurl + 'route/middleware/controller/user/auth/User_Delete_blog/blog_id=/' +_id ,{ 'headers': headers })
  }
  public async userView(_id:any){
    const token:any= localStorage.getItem('token');
    const headers = new HttpHeaders()
    .set('content-type','applicatio/json')
    .set('Authorization',token);
    return  this.http.get(environment.baseurl +'route/middleware/controller/user/auth/User_view_blog/blog_id=/' +_id , {'headers':headers})
  }

  public async userEdit(_id:any , editedData: any){
    // debugger
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', token);
    return this.http.put(environment.baseurl + 'route/middleware/controller/user/auth/User_Update_blog/blog_id=/' + _id, editedData, { 'headers': headers }).subscribe((dtaa)=>{
      console.log('in tsss',dtaa);
      
    })
  }
}

