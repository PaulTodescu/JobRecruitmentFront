import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from "../services/user/user.service";
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class EmployeeGuard implements CanActivate {

  constructor(
    private userService: UserService) {
  }

  canActivate(): Observable<boolean> {
    this.userService.checkIfLoggedInUserIsEmployee().subscribe(
      (response: boolean) => {
        if (!response) {
          this.showPermissionDeniedMessage();
        }
      }
    );

    return this.userService.checkIfLoggedInUserIsEmployee();
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
