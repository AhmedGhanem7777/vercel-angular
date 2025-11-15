import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router)

  if (localStorage.getItem('userToken') != null && localStorage.getItem('role') == 'admin') {
    return true
  } else {
    _Router.navigate(['/auth'])
    return false
  }
};
