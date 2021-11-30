import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from "../services/user/user.service";

@Injectable({
  providedIn: 'root'
})
export class BaseGuard implements CanActivate {
  // @ts-ignore
  constructor(
    private userService: UserService,
    private router: Router) {
  }

  canActivate(): boolean {
    if (this.userService.loggedIn()){
      this.router.navigate(['/home'])
      return true;
    } else {
      this.router.navigate(['/authenticate']);
      return false;
    }
  }

}
