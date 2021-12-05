import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user/user.service";
import {Job} from "../entities/job";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {JobService} from "../services/job/job.service";
import Swal from "sweetalert2";
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {JobDetailsComponent} from "../job-details/job-details.component";
import {AddJobComponent} from "../add-job/add-job.component";
import {EditJobComponent} from "../edit-job/edit-job.component";

@Component({
  selector: 'app-recruiter-jobs',
  templateUrl: './recruiter-jobs.component.html',
  styleUrls: ['./recruiter-jobs.component.scss']
})
export class RecruiterJobsComponent implements OnInit {

  jobs: Job[] | undefined;
  nr_jobs = 0;

  constructor(
    private userService: UserService,
    private jobService: JobService,
    private router: Router,
    private dialog: MatDialog) { }

  public getJobsForCurrentUser(): void{
    this.userService.getJobsForCurrentUser().subscribe(
      (response: Job[]) => {
        this.jobs = response;
        this.nr_jobs = response.length;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public goToAddJob(): void{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.height = "90%";
    this.dialog.open(AddJobComponent, dialogConfig);
    this.dialog._getAfterAllClosed().subscribe(() => {
      this.getJobsForCurrentUser();
    });
  }

  public goToEditJob(jobId: number): void{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.height = "90%";
    dialogConfig.data = {jobId: jobId};
    this.dialog.open(EditJobComponent, dialogConfig);
    this.dialog._getAfterAllClosed().subscribe(() => {
      this.getJobsForCurrentUser();
    });
  }

  public openJobDetailsModal(jobId: number): void{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "40%";
    dialogConfig.height = "90%";
    dialogConfig.data = {jobId: jobId};
    this.dialog.open(JobDetailsComponent, dialogConfig);
  }

  public deleteJob(jobId: number, jobTitle: string): void {
    this.jobService.deleteJob(jobId).subscribe(
      () => {
        Swal.fire(
          'Job Deleted!',
          jobTitle + ' has been removed',
          'success'
        )
        this.getJobsForCurrentUser();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        this.onFail("Something went wrong. Try again later.")
      }
    )
  }

  public openDeleteConfirmationDialog(jobId: number, jobTitle: string): void{
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete job: ' + jobTitle,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteJob(jobId, jobTitle);
      }
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

  goToJobPage(jobId: number): void {
    this.router.navigate(['/job/details'], {
      queryParams: {'jobId': jobId}
    });
  }

  ngOnInit(): void {
    this.getJobsForCurrentUser();
  }

}
