import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class SuperAuthGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      var isAuthenticated = this.authService.isSuperAdmin()
      console.log("AuthGUARD: " + isAuthenticated)
      if(!isAuthenticated){
        this.router.navigateByUrl("/groups")
        return false
      }
    return true
  }
}
