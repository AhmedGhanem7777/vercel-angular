import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICodeAndNewPass, ILoginRequest, ILoginResponse, INewPass, IResponseChangePass, IResponseForgotPass, IResponseRegister, IResponseResetPass } from '../models/auth.interface';
import { Router } from '@angular/router';

Observable
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentEmail:string = ''
  constructor(private _HttpClient: HttpClient, private _Router: Router) { }

  Login(userData: ILoginRequest): Observable<ILoginResponse> {
    return this._HttpClient.post<ILoginResponse>('/admin/users/login', userData)
  }

  Register(userData: any): Observable<IResponseRegister> {
    return this._HttpClient.post<IResponseRegister>('/portal/users', userData)
  }

  Logout() {
    localStorage.removeItem('userToken')
    localStorage.removeItem('userName')
    localStorage.removeItem('role')
    localStorage.removeItem('id')
    this._Router.navigate(['/auth'])
  }

  forgotPassword(email: string): Observable<IResponseForgotPass> {
    return this._HttpClient.post<IResponseForgotPass>('/portal/users/forgot-password', {email:email})
  }

  resetPassword(data: ICodeAndNewPass): Observable<IResponseResetPass> {
    return this._HttpClient.post<IResponseResetPass>('/portal/users/reset-password', data)
  }

  changePassword(data: INewPass):Observable<IResponseChangePass> {
    return this._HttpClient.post<IResponseChangePass>('/admin/users/change-password', data)
  }

}
