import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponseSpecificUser } from '../../models/admin/users.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private _HttpClient: HttpClient) { }

  getCurrentUser(id: any): Observable<IResponseSpecificUser> {
    return this._HttpClient.get<IResponseSpecificUser>(`/admin/users/${id}`)
  }
}

