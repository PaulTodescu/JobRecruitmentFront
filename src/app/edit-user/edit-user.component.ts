import {Component, Injector, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  editUserForm!:FormGroup;
  loggedInUser: UserDTO | undefined;
  isPhoneNumberEmpty: boolean = false;

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
        alert(error.message);
      }
    )
  }

  public editUser(editUserForm: FormGroup): void{
    if (this.loggedInUser?.firstName !== undefined && this.loggedInUser?.lastName !== undefined
      && this.loggedInUser?.email !== undefined && this.loggedInUser.role !== undefined){
      this.userService.editUser(editUserForm.value).subscribe(
        (response: UserDTO) => {
          this.onSuccess();
      },
        (error: HttpErrorResponse) => {
          alert(error.message);
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

  ngOnInit(): void {
    this.getLoggedInUser();
    this.editUserForm = this.formBuilder.group({
      firstName: [],
      lastName:[],
      email:[],
      phoneNumber:[],
      contactMethod:[],
      role:[],
    })

    this.editUserForm.controls['email'].disable();
    this.editUserForm.controls['role'].disable();
  }

}
