import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor(private _HttpClient: HttpClient,private http:HttpClient) { }

  getAllRooms(data: any): Observable<any> {
    return this._HttpClient.get('/admin/rooms', { params: data })
  }
  
  getRoomById(roomId: string): Observable<any> {
    return this._HttpClient.get(`/admin/rooms/${roomId}`);
  }
  
  deleteRoom(id: number): Observable<any> {
    return this._HttpClient.delete(`/admin/rooms/${id}`);
  }
  
  
  
  
  



  
  
  
  
  editRoom(id: number, data: any): Observable<any> {
    return this._HttpClient.put(`/admin/rooms/${id}`, data);
  }
  addRoom(data: any): Observable<any> {
    return this._HttpClient.post('/admin/rooms', data);
  }












}
