import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponseAddAds, IResponseDeleteAds, IResponseEditAds, IResponseGetAds, IResponseGetSpecificAds } from '../../models/admin/ads.interface';

@Injectable({
  providedIn: 'root'
})
export class AdsService {

  constructor(private _HttpClient: HttpClient) { }

  getAds(params: any): Observable<IResponseGetAds> {
    return this._HttpClient.get<IResponseGetAds>('/admin/ads', { params: params })
  }
  getAdsById(id: string): Observable<IResponseGetSpecificAds> {
    return this._HttpClient.get<IResponseGetSpecificAds>(`/admin/ads/${id}`)
  }
  addAds(data: any): Observable<IResponseAddAds> {
    return this._HttpClient.post<IResponseAddAds>('/admin/ads', data)
  }
  editAds(id: string, discount: number, isActive: boolean): Observable<IResponseEditAds> {
    return this._HttpClient.put<IResponseEditAds>(`/admin/ads/${id}`, {
      discount: discount,
      isActive: isActive
    })
  }
  deleteAds(id: string): Observable<IResponseDeleteAds> {
    return this._HttpClient.delete<IResponseDeleteAds>(`/admin/ads/${id}`)
  }
}
