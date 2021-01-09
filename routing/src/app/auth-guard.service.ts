import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateChild,
  UrlTree
} from '@angular/router';

import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    const isAuthenticated = this.authService.isAuthenticated()
    if (isAuthenticated) {
      return true;
    } else {
      this.router.navigate(['/']);
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.canActivate(childRoute, state);
  }

  constructor(private authService: AuthService, private router: Router) {
  }
}
