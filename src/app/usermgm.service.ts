import { environment } from './../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsermgmService {

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

}
