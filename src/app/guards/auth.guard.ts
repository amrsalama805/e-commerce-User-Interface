import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const authGuard: CanActivateFn = (route, state) => {

  const token = localStorage.getItem('token');
  if ( token != null) {
    return true;
  } else {
    const router = inject(Router);
    return router.navigate(['login']);
  }
};