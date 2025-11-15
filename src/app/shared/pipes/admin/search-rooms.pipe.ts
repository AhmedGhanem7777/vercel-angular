import { Pipe, PipeTransform } from '@angular/core';
import { IRooms } from '../../../core/models/admin/rooms.interface';

@Pipe({
  name: 'searchRooms'
})
export class SearchRoomsPipe implements PipeTransform {

  transform(rooms: IRooms[], searchTerm: string): IRooms[] {
      if (!rooms || !searchTerm) return rooms;
  
      return rooms.filter(room =>
        room.roomNumber.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

}
