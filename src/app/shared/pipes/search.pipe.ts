import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

    transform(rooms: any[], searchInput: number): any[] {
      if (!rooms || !searchInput) {
        return rooms;
      }

      return rooms.filter(room =>
        room.capacity == searchInput
      );
    }

}
