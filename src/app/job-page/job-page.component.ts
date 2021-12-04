import { Component, OnInit } from '@angular/core';
import {Job} from "../entities/job";
import {JobService} from "../services/job/job.service";
import {ActivatedRoute} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddJobComponent} from "../add-job/add-job.component";
import {ApplicationPageComponent} from "../application-page/application-page.component";
import {UserService} from "../services/user/user.service";
import Swal from "sweetalert2";
import {UserDTO} from "../entities/userDTO";
import {ApplicationDTO} from "../entities/applicationDTO";
import {AddCommentComponent} from "../add-comment/add-comment.component";

@Component({
  selector: 'app-job-page',
  templateUrl: './job-page.component.html',
  styleUrls: ['./job-page.component.scss']
})
export class JobPageComponent implements OnInit {

  job: Job | undefined;
  flag: boolean = false;
  userRole: string | undefined;
  loggedInUser: UserDTO | undefined;
  employeeApplications: ApplicationDTO[] | undefined;
  jobImage: string | undefined;

  constructor(
    private jobService: JobService,
    private dialog: MatDialog,
    private userService: UserService,
    private activatedRout: ActivatedRoute) {
      this.activatedRout.queryParams.subscribe(
        data => {
          this.getJob(data.jobId);
          this.getJobImage(data.jobId);
        }
      )
  }

  public getJob(jobId: number): void {
    this.jobService.getJobById(jobId).subscribe(
      (response: Job) => {
        this.job = response;
        this.job.description =
          '<h3>' + this.job.description
            .replace(/ /g, '\u00a0')
            .replace(/(\r\n|\r|\n)/g, '<br />') +
          '</h3>';
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public getJobImage(jobId: number) {
    this.jobService.getJobImage(jobId).subscribe(
      (response: string) => {
        this.jobImage = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  private  getLoggedInUser() {
    this.userService.getLoggedInUser().subscribe(
      (response: UserDTO) => {
        this.loggedInUser = response;
        this.userRole = response.role;
        this.getEmployeeApplications();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  getEmployeeApplications(): void{
    if (this.loggedInUser?.role === 'EMPLOYEE') {
      this.userService.getEmployeeApplications().subscribe(
        (response: ApplicationDTO[]) => {
          this.employeeApplications = response;
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      )
    }
  }

  switchBetweenDescriptionReviews(option: string){
    this.flag = option == 'description';
  }

  public applyToJob(jobId: number | undefined){
    if (this.userRole === 'EMPLOYEE') {
      if (this.employeeApplications !== undefined) {
          for (let i = 0; i < this.employeeApplications?.length; i++){
            if (jobId === this.employeeApplications[i].job.id){
              this.showErrorMessage("You already applied to this job");
              return;
            }
          }
      }
      if (jobId != undefined) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.width = "40%";
        dialogConfig.height = "85%";
        dialogConfig.data = {jobId: jobId};
        this.dialog.open(ApplicationPageComponent, dialogConfig);
      }
    }
  }

  public showErrorMessage(message: string): void{
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

  // addComment(jobId: number | undefined): void {
  //   if (jobId != undefined){
  //     Swal.fire({
  //       title: 'Enter comment',
  //       input: 'textarea',
  //       width: '45%',
  //       customClass: {
  //         input: 'confirm-comment'
  //       }
  //     }).then(function(result) {
  //       if (result.value) {
  //
  //       }
  //     })
  //   }
  // }

  public addComment(jobId: number | undefined): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.height = "40%";
    dialogConfig.data = {jobId: jobId};
    this.dialog.open(AddCommentComponent, dialogConfig);
  }

  ngOnInit(): void {
    this.getLoggedInUser();
  }

}
