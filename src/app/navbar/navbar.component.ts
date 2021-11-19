import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  username: string | undefined;

  constructor(
    private userService: UserService,
    private router: Router) { }

  public getCurrentUser(): void{
    this.userService.getUsername().subscribe(
      (response: string) => {
        this.username = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public goToAddJob(): void{
    this.router.navigateByUrl('job/add');
  }

  public goToEditProfile(): void{
    this.router.navigateByUrl('user/edit');
  }

  public logout(): void{
    localStorage.removeItem('token');
    this.router.navigateByUrl('authenticate');
  }

  ngOnInit(): void {
    this.getCurrentUser();
  }

}
