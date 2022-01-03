import {Component, Injector, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from "../services/user/user.service";
import {UserDTO} from "../entities/userDTO";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  loggedInUser: UserDTO | undefined;
  isPhoneNumberEmpty: boolean = false;

  editUserForm = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^(?:[a-zA-Z\s]+)?$/)]],
    lastName:['', [Validators.required, Validators.minLength(3), Validators.pattern(/^(?:[a-zA-Z\s]+)?$/)]],
    email:[],
    phoneNumber:['', [Validators.minLength(5), Validators.pattern("^[0-9]*$")]],
    contactMethod:[],
    role:[],
  })

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private injector: Injector) { }

  public getLoggedInUser(): void{
    this.userService.getLoggedInUser().subscribe(
      (response: UserDTO) => {
        this.loggedInUser = response
        this.setInitialValues(response);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }

  public editUser(editUserForm: FormGroup): void{
    if (this.loggedInUser?.firstName !== undefined && this.loggedInUser?.lastName !== undefined
      && this.loggedInUser?.email !== undefined && this.loggedInUser.role !== undefined){
      this.userService.editUser(editUserForm.value).subscribe(
        () => {
          this.onSuccess();
      },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      )
     }
  }

  checkIfPhoneNumberIsPresent(): void {
    let phone = this.editUserForm.get('phoneNumber')?.value;
    if (phone === null || phone === undefined || phone.length === 0){
      this.isPhoneNumberEmpty = false;
      this.editUserForm.controls['contactMethod'].disable();
      this.editUserForm.patchValue({
        contactMethod: 'EMAIL'
      })
    } else {
      this.isPhoneNumberEmpty = true;
      this.editUserForm.controls['contactMethod'].enable();
    }
  }

  public onSuccess(): void {
    let router: Router = this.injector.get(Router);
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your profile was updated',
      showConfirmButton: false,
      timer: 2000
    }).then(function(){
      router.navigateByUrl("home");
    })
  }

  public setInitialValues(user: UserDTO){
    this.editUserForm.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      contactMethod: user.contactMethod,
      role: user.role
    })

    this.checkIfPhoneNumberIsPresent();
  }

  getFormFirstNameErrorMessage() {
    if (this.editUserForm.get('firstName')?.hasError('required')){
      return 'you must enter a value';
    }
    else if (this.editUserForm.get('firstName')?.hasError('minlength')){
      return 'enter at least 3 characters';
    }
    else if (this.editUserForm.get('firstName')?.invalid){
      return 'only alphabetical characters are allowed';
    }
    return;
  }

  getFormLastNameErrorMessage() {
    if (this.editUserForm.get('lastName')?.hasError('required')){
      return 'you must enter a value';
    }
    else if (this.editUserForm.get('lastName')?.hasError('minlength')){
      return 'enter at least 3 characters';
    }
    else if (this.editUserForm.get('lastName')?.invalid){
      return 'only alphabetical characters are allowed';
    }
    return;
  }

  getFormPhoneNumberErrorMessage() {
    if (this.editUserForm.get('phoneNumber')?.hasError('minlength')){
      return 'enter at least 5 characters';
    }
    else if (this.editUserForm.get('phoneNumber')?.invalid){
      return 'only digits are allowed';
    }
    return;
  }

  ngOnInit(): void {
    this.getLoggedInUser();

    // these should always be disabled
    this.editUserForm.controls['email'].disable();
    this.editUserForm.controls['role'].disable();
  }

}
