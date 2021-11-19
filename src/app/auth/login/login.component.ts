import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationResponse } from 'src/app/entities/AuthenticationResponse';
import { UserService } from 'src/app/services/user/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup; 
  hidePassword: boolean = true;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private injector: Injector) { }
  
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:[''],
      password:['']
    })
  }

  login(loginForm: FormGroup): void{

    this.userService.loginUser(loginForm.value).subscribe(
      (authenticationResponse: AuthenticationResponse) => {
        console.log(authenticationResponse);
        localStorage.setItem('token',authenticationResponse.jwt);
        var email = this.loginForm.get('email')?.value;
        this.userService.getUsernameByEmail(email).subscribe(
          (usernameResponse) => {
            var username = usernameResponse;
            this.onSuccess(username);
          }
        )
       
      },
      (error: HttpErrorResponse) => {
        this.showWrongCredentialsErrorMessage();
      }
    );
  }

  public printMe(str: string): void{
    alert(str);
  }

  public onSuccess(username: string): void{
    var router: Router = this.injector.get(Router);
    this.userService
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Hello ' + username,
      showConfirmButton: false,
      timer: 2000
    }).then(function(){
      router.navigateByUrl("home");
    })
  }

  public showWrongCredentialsErrorMessage(): void{
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Invalid Email Address or Password',
        showConfirmButton: false,
        timer: 2200
      }).then(function(){
        // window.location.reload();
      })
    }

  }


