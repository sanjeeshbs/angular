import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(route, state: RouterStateSnapshot){
    const user = this.authService.currentUser;
    if (this.authService.isLoggedIn() && user && user.admin === 'true' ) { return true; }

    this.router.navigate(['/no-access']);
    return false;
  }

}
