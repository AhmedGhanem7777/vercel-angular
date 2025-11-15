import { Pipe, PipeTransform } from '@angular/core';
import { IFacility } from '../../../core/models/admin/facility.interface';

@Pipe({
  name: 'searchFacility'
})
export class SearchFacilityPipe implements PipeTransform {

  transform(facilities: IFacility[], searchTerm: string): IFacility[] {
        if (!facilities || !searchTerm) return facilities;
    
        return facilities.filter(facility =>
          facility.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

}
