import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponseFav, IResponseRemoveFavoriteRooms, IResponseRoomDetails, IRoomsResponse } from '../models/adsUser.interface';


@Injectable({
  providedIn: 'root'
})
export class AdsUserService {

  constructor(private _HttpClient: HttpClient) { }

  getAllRooms(params:any): Observable<IRoomsResponse> {
    return this._HttpClient.get<IRoomsResponse>('/portal/rooms/available',{params:params})
  }
  getRoomById(id: string): Observable<IResponseRoomDetails> {
    return this._HttpClient.get<IResponseRoomDetails>(`/portal/rooms/${id}`)
  }
  getRoomFav(): Observable<IResponseFav> {
    return this._HttpClient.get<IResponseFav>('/portal/favorite-rooms')
  }
  addRoomToFav(roomId: string): Observable<IResponseFav> {
    return this._HttpClient.post<IResponseFav>('/portal/favorite-rooms', { roomId: roomId })
  }
  removeFromFav(roomId: string): Observable<IResponseRemoveFavoriteRooms> {
    return this._HttpClient.delete<IResponseRemoveFavoriteRooms>(`/portal/favorite-rooms/${roomId}`, { body: { roomId } });
  }
  getAllAds(): Observable<any> {
    return this._HttpClient.get<any>('/portal/ads')
  }
  getRoomAccordingDate(startDate: any, endDate: any): Observable<any> {
    return this._HttpClient.get((`/explore-rooms?startDate=${startDate}&endDate=${endDate}`))
  }
}
