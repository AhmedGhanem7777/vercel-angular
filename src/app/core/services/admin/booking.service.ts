import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponseDeleteBooking, IResponseGetBooking, IResponseGetSpecificBooking } from '../../models/admin/booking.interface';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private _HttpClient: HttpClient) { }

  getBooking(params: any): Observable<IResponseGetBooking> {
    return this._HttpClient.get<IResponseGetBooking>('/admin/booking', { params: params })
  }
  getBookingId(id: string): Observable<IResponseGetSpecificBooking> {
    return this._HttpClient.get<IResponseGetSpecificBooking>(`/admin/booking/${id}`);
  }
  deleteBooking(id: string): Observable<IResponseDeleteBooking> {
    return this._HttpClient.delete<IResponseDeleteBooking>(`/admin/booking/${id}`);
  }
}

