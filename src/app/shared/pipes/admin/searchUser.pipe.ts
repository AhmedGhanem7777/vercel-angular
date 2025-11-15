import { Pipe, PipeTransform } from '@angular/core';
import { IUsers } from '../../../core/models/admin/users.interface';

@Pipe({
  name: 'searchUser'
})
export class SearchUserPipe implements PipeTransform {

  transform(users: IUsers[], searchTerm: string): IUsers[] {
    if (!users || !searchTerm) return users;

    return users.filter(user =>
      user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) 
    );
  }

}
