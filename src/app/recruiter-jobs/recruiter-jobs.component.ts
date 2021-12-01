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
  }

  goToEditJob(jobId: number): void{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.height = "90%";
    dialogConfig.data = {jobId: jobId};
    this.dialog.open(EditJobComponent, dialogConfig);
  }

  openJobDetailsModal(jobId: number): void{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "40%";
    dialogConfig.height = "90%";
    dialogConfig.data = {jobId: jobId};
    this.dialog.open(JobDetailsComponent, dialogConfig);
  }

  deleteJob(jobId: number): void {
    this.jobService.deleteJob(jobId).subscribe(
      () => {
        this.getJobsForCurrentUser();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
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
        this.deleteJob(jobId);
        Swal.fire(
          'Job Deleted!',
          jobTitle + ' has been removed',
          'success'
        )
      }
    })
  }

  ngOnInit(): void {
    this.getJobsForCurrentUser();
  }

}
