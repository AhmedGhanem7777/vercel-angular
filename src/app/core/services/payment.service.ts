import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private _HttpClient: HttpClient) { }

  startBooking(bookingForm: any): Observable<any> {
    return this._HttpClient.post<any>(`/portal/booking`, bookingForm)
  }

  processPayment(id: string, token: any): Observable<any> {
    return this._HttpClient.post<any>(`/portal/booking/${id}/pay`, { token: token })
  }
}
