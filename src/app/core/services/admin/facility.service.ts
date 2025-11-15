import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponseAddFacility, IResponseDeleteFacility, IResponseEditFacility, IResponseGetFacilities, IResponseSpecificFacility } from '../../models/admin/facility.interface';

@Injectable({
  providedIn: 'root'
})
export class FacilityService {

  constructor(private _HttpClient: HttpClient) { }

  getFacilities(params: any): Observable<IResponseGetFacilities> {
    return this._HttpClient.get<IResponseGetFacilities>('/admin/room-facilities', { params: params });
  }
  getFacilityById(facilityId: string): Observable<IResponseSpecificFacility> {
    return this._HttpClient.get<IResponseSpecificFacility>(`/admin/room-facilities/${facilityId}`);
  }
  addNewFacilitie(name: string): Observable<IResponseAddFacility> {
    return this._HttpClient.post<IResponseAddFacility>('/admin/room-facilities', { name: name })
  }
  editFacility(name: string, id: string): Observable<IResponseEditFacility> {
    return this._HttpClient.put<IResponseEditFacility>(`/admin/room-facilities/${id}`, { name: name })
  }
  deleteFacility(id: string): Observable<IResponseDeleteFacility> {
    return this._HttpClient.delete<IResponseDeleteFacility>(`/admin/room-facilities/${id}`)
  }
}
