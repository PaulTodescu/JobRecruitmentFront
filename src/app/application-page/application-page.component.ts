import {Component, Inject, Injector, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Job} from "../entities/job";
import {HttpErrorResponse} from "@angular/common/http";
import {JobService} from "../services/job/job.service";
import {UserDTO} from "../entities/userDTO";
import {UserService} from "../services/user/user.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-application-page',
  templateUrl: './application-page.component.html',
  styleUrls: ['./application-page.component.scss']
})
export class ApplicationPageComponent implements OnInit {

  jobToDisplay: Job | undefined;
  loggedInUser: UserDTO | undefined;
  cvPath: string = 'empty';
  applicationCV: File | undefined;

  applicationForm = this.formBuilder.group({
    firstName: [],
    lastName:[],
    email:[],
    phoneNumber:[],
    contactMethod:[]
  });

  constructor(
    private formBuilder: FormBuilder,
    private jobService: JobService,
    private userService: UserService,
    private injector: Injector,
    @Inject(MAT_DIALOG_DATA) public data: { jobId: number }) { }

  private  getLoggedInUser() {
    this.userService.getLoggedInUser().subscribe(
      (response: UserDTO) => {
        this.loggedInUser = response;
        this.setUserValues(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  private setUserValues(user: UserDTO) {

    let phoneNumber: string;
    let contactMethod: string;
    if (user.phoneNumber === null || user.phoneNumber === undefined || user.phoneNumber.length === 0){
      phoneNumber = 'Not Provided';
      contactMethod = 'EMAIL';
    } else {
      phoneNumber = user.phoneNumber;
      contactMethod = user.contactMethod;
    }

    this.applicationForm.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: phoneNumber,
      contactMethod: contactMethod
    })
  }

  sendApplication() {
    if (this.loggedInUser?.role === 'EMPLOYEE') {
      this.onSuccess();
    } else {
      this.onFail("")
    }
  }

  uploadFile(event: Event) {
    this.cvPath = 'empty';
    this.applicationCV = undefined;
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.cvPath = fileList[0].name;
      this.applicationCV = fileList[0];
    }
  }

  public onSuccess(): void {
    let router: Router = this.injector.get(Router);
    let dialogRef: MatDialogRef<ApplicationPageComponent> = this.injector.get(MatDialogRef);
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Application submitted successfully',
      showConfirmButton: false,
      timer: 2500
    }).then(function(){
      dialogRef.close();
      // location.reload()
      // router.navigateByUrl("home");
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

  ngOnInit(): void {

    this.getLoggedInUser();

    this.applicationForm.controls['firstName'].disable();
    this.applicationForm.controls['lastName'].disable();
    this.applicationForm.controls['email'].disable();
    this.applicationForm.controls['phoneNumber'].disable();
    this.applicationForm.controls['contactMethod'].disable();

  }

}
