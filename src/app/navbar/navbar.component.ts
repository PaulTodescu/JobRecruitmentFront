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
  userRole: string | undefined;

  constructor(
    private userService: UserService,
    private router: Router) { }

  public getCurrentUser(): void{
    this.userService.getUsername().subscribe(
      (response: string) => {
        this.username = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }

  public getCurrentUserRole(): void {
    this.userService.getLoggedInUserRole().subscribe(
      (response: string) => {
        this.userRole = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }

  public goToAddJob(): void{
    this.router.navigateByUrl('job/add');
  }

  public goToHome(): void{
    this.router.navigateByUrl('home');
  }

  public goToMyJobs(): void{
    this.router.navigateByUrl('myjobs');
  }

  public goToMyApplications(): void {
    this.router.navigateByUrl('myapplications');
  }

  public goToEditProfile(): void{
    this.router.navigateByUrl('user/edit');
  }

  public logout(): void{
    localStorage.removeItem('token');
    this.router.navigateByUrl('');
  }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getCurrentUserRole();
  }

}
