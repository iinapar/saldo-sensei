import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthenticateService } from '../services/cognito.service';
import { map, Observable } from 'rxjs';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | any> => {
  const authService = inject(AuthenticateService);
  const router = inject(Router);

  return authService.isSessionValid().pipe(
    map((loggedIn) => {
      return loggedIn ? true : router.createUrlTree(['/auth/sign-in']);
    })
  );
};
