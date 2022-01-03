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
import { ngxCsv } from 'ngx-csv/ngx-csv';

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
        console.log(error.message);
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

  public goToJobPage(jobId: number): void {
    this.router.navigate(['/job/details'], {
      queryParams: {'jobId': jobId}
    });
  }

  public downloadJobsCsv(): void {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: false,
      title: '',
      useBom: true,
      noDownload: false,
      headers: ["Added on", "Title", "Offered By", "Location", "Salary", "Currency", "Type", "Description"]
    };

    if (this.jobs !== undefined) {
      let csvData = [];
      for (let i = 0; i < this.jobs.length; i++) {
        if (this.jobs[i].salary === null){
          this.jobs[i].salary = 0;
        }
        if (this.jobs[i].salaryCurrency === null){
          this.jobs[i].salaryCurrency = 'none';
        }
        if (this.jobs[i].salaryType === null){
          this.jobs[i].salaryType = 'none';
        }
        let entry = {
          "createdAt": this.jobs[i].createdAt,
          "title": this.jobs[i].title,
          "companyName": this.jobs[i].companyName,
          "location": this.jobs[i].location,
          "salary": this.jobs[i].salary,
          "salaryCurrency": this.jobs[i].salaryCurrency,
          "salaryType": this.jobs[i].salaryType,
          "description": this.jobs[i].description
        };
        csvData.push(entry);
      }
      let today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      const yyyy = today.getFullYear();

      let title = 'Jobs-' + dd + '-' + mm + '-' + yyyy;

      new ngxCsv(csvData, title, options);

    }
  }

  ngOnInit(): void {
    this.getJobsForCurrentUser();
  }

}
