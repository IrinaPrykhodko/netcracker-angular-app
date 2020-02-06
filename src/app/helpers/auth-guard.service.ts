import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.authService.checkIsTokenExpired();

    if (this.authService.isUserLoggedIn()) {
      return true;
    }

    this.authService.redirectRoute = state.url;
    this.router.navigate(['/login']);
    return false;
  }
}
