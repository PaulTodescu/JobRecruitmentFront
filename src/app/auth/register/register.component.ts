import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/entities/user';
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
      firstName: [''],
      lastName:[''],
      email:[''],
      password: [''],
      role: ['']
    })
  }

  public register(registerForm: FormGroup): void{
    this.userService.registerUser(registerForm.value).subscribe(
      (response: void) => {
        console.log(response);
        this.onSuccess();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
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

}
