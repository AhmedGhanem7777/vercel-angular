import { Pipe, PipeTransform } from '@angular/core';
import { IBooking } from '../../../core/models/admin/booking.interface';

@Pipe({
  name: 'searchBooking'
})
export class SearchBookingPipe implements PipeTransform {

  transform(item: IBooking[], searchTerm: string): IBooking[] {
    if (!item || !searchTerm) return item;

    return item.filter(item =>
      item.room.roomNumber.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

}
