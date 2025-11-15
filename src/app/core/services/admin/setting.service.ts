import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponseChangePass } from '../../models/admin/settings.interface';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(private _HttpClient: HttpClient) { }

  changePassword(formData: any): Observable<IResponseChangePass> {
    return this._HttpClient.post<IResponseChangePass>('/admin/users/change-password', formData)
  }
}

