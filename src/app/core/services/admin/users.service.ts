import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponseGetUsers, IResponseSpecificUser } from '../../models/admin/users.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _HttpClient: HttpClient) { }

  getAllUsers(params: any): Observable<IResponseGetUsers> {
    return this._HttpClient.get<IResponseGetUsers>('/admin/users', { params: params })
  }

  getUserInfoById(id: string): Observable<IResponseSpecificUser> {
    return this._HttpClient.get<IResponseSpecificUser>(`/admin/users/${id}`)
  }
}
