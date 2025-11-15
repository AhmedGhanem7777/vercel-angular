import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponseRoomReviews } from '../models/roomDetails.interface';

@Injectable({
  providedIn: 'root'
})
export class RoomDetailsService {

  constructor(private _HttpClient: HttpClient) { }

  getRoomReviews(roomId: string): Observable<IResponseRoomReviews> {
    return this._HttpClient.get<IResponseRoomReviews>(`/portal/room-reviews/${roomId}`)
  }

  setReview(data: any): Observable<any> {
    return this._HttpClient.post<any>(`/portal/room-reviews/`, data)
  }

  addComment(data: any): Observable<any> {
    return this._HttpClient.post<any>(`/portal/room-comments`, data)
  }
  
}
