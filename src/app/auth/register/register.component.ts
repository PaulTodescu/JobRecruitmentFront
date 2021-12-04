import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!:FormGroup;
  hidePassword: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^(?:[a-zA-Z\s]+)?$/)]],
      lastName:['', [Validators.required, Validators.minLength(3), Validators.pattern(/^(?:[a-zA-Z\s]+)?$/)]],
      email:['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(5)]],
      role: ['', [Validators.required]]
    })
  }

  public register(registerForm: FormGroup): void{
    if (!this.checkPasswordsMatch()){
      this.onFail('Passwords are not the same');
      return;
    }
    this.userService.registerUser(registerForm.value).subscribe(
      (response: void) => {
        console.log(response);
        this.onSuccess();
      },
      (error: HttpErrorResponse) => {
        this.onFail('Something went wrong. Try again later.');
        console.log(error.message);
      }
    );
  }

  public onSuccess(): void{
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your account was created',
      showConfirmButton: false,
      timer: 2000
    }).then(function(){
      window.location.reload();
    })
  }

  public onFail(message: string): void{
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: message,
      showConfirmButton: false,
      timer: 2500
    }).then(function(){
      // window.location.reload();
    })
  }

  getFormFirstNameErrorMessage() {
    if (this.registerForm.get('firstName')?.hasError('required')){
      return 'you must enter a value';
    }
    else if (this.registerForm.get('firstName')?.hasError('minlength')){
      return 'enter at least 3 characters';
    }
    else if (this.registerForm.get('firstName')?.invalid){
      return 'only alphabetical characters are allowed';
    }
    return;
  }

  getFormLastNameErrorMessage() {
    if (this.registerForm.get('lastName')?.hasError('required')){
      return 'you must enter a value';
    }
    else if (this.registerForm.get('lastName')?.hasError('minlength')){
      return 'enter at least 3 characters';
    }
    else if (this.registerForm.get('lastName')?.invalid){
      return 'only alphabetical characters are allowed';
    }
    return;
  }

  getFormEmailErrorMessage() {
    if (this.registerForm.get('email')?.hasError('required')){
      return 'you must enter a value';
    }
    else if (this.registerForm.get('email')?.hasError('email')){
      return 'enter a valid email';
    }
    return;
  }

  getFormPasswordErrorMessage() {
    if (this.registerForm.get('password')?.hasError('required')){
      return 'you must enter a value';
    }
    else if (this.registerForm.get('password')?.hasError('minlength')){
      return 'enter at least 5 characters';
    }
    return;
  }

  getFormConfirmPasswordErrorMessage() {
    if (this.registerForm.get('password')?.hasError('required')){
      return 'you must enter a value';
    }
    else if (this.registerForm.get('password')?.hasError('minlength')){
      return 'enter at least 5 characters';
    }
    return;
  }

  getFormRoleErrorMessage() {
    if (this.registerForm.get('password')?.hasError('required')){
      return 'you must select a value';
    }
    return;
  }

  checkPasswordsMatch(): boolean {
    let password = this.registerForm.get('password')?.value;
    let confirmPassword = this.registerForm.get('confirmPassword')?.value;
    return password === confirmPassword;
  }
}
