import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiURL = 'http://localhost:2020';

  token: any = localStorage.getItem('token');

  setHeaders = {
    headers: new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', this.token),
  };

  constructor(private httpClient: HttpClient) {}

  /*--------------------User Signup---------------*/
  async userSignup(formData: any): Promise<any> {
    const res: any = await this.httpClient
      .post(`${this.apiURL}/user/userSignup`, formData)
      .toPromise();

    if (res.status) {
      this.setDataAfterUSerLogin(res);
    }
    return res;
  }

  /*--------------------User Login----------------*/
  async userLogin(data: any): Promise<any> {
    const user: any = await this.httpClient
      .post(`${this.apiURL}/user/userLogin`, data)
      .toPromise();

    if (user.status) {
      this.setDataAfterUSerLogin(user);
    }
    return user;
  }

  /*---------------------User Update-----------------*/
  async updateUser(data: any) {
    const res: any = await this.httpClient
      .post(`${this.apiURL}/user/updateUser`, data, this.setHeaders)
      .toPromise();

    if (res.status) {
      localStorage.setItem('user', JSON.stringify(res.result));
    }
    return res;
  }

  /*-----------------------Forget Password-------------------*/
  forgetPassword(email: any) {
    return this.httpClient.post(`${this.apiURL}/user/forgetPassword`, email);
  }

  /*-----------------------Reset Password--------------------*/
  resetPassword(data: any) {
    console.log(data);
    return this.httpClient.post(`${this.apiURL}/user/resetPassword`, data,this.setHeaders);
  }

  /*----------------set data after user login----------------*/
  setDataAfterUSerLogin(res: any) {
    localStorage.setItem('token', res.token);
    localStorage.setItem('isLoggedIn', JSON.stringify(true));
    localStorage.setItem('user', JSON.stringify(res.result));
    this.token = localStorage.getItem('token');
  }

  clearData() {
    localStorage.clear();
  }
}
