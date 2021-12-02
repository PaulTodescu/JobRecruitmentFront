import {Injectable, Injector} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from "../services/user/user.service";
import {HttpErrorResponse} from "@angular/common/http";
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class RecruiterGuard implements CanActivate {

  constructor(
    private userService: UserService) {
  }

  canActivate(): Observable<boolean> {
    this.userService.checkIfLoggedInUserIsRecruiter().subscribe(
      (response: boolean) => {
        if (!response) {
          this.showPermissionDeniedMessage();
        }
      }
    );

    return this.userService.checkIfLoggedInUserIsRecruiter();
  }

  public showPermissionDeniedMessage(): void{
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'permission denied',
      showConfirmButton: false,
      timer: 2200
    }).then(function(){
      location.reload();
    })
  }
}

