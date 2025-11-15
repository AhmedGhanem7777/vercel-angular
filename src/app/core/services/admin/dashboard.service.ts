import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private _HttpClient:HttpClient) { }

  getCharts(): Observable<any> {
    return this._HttpClient.get('/admin/dashboard');
  }
}
