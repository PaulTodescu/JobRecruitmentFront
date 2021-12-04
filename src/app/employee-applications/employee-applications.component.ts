import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user/user.service";
import {Job} from "../entities/job";
import {JobService} from "../services/job/job.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ApplicationDTO} from "../entities/applicationDTO";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {JobDetailsComponent} from "../job-details/job-details.component";

@Component({
  selector: 'app-employee-applications',
  templateUrl: './employee-applications.component.html',
  styleUrls: ['./employee-applications.component.scss']
})
export class EmployeeApplicationsComponent implements OnInit {

  applications: ApplicationDTO[] | undefined;
  nr_applications: number = 0;

  constructor(
    private userService: UserService,
    private jobService: JobService,
    private router: Router,
    private dialog: MatDialog) { }

  private getEmployeeApplications(): void {
    this.userService.getEmployeeApplications().subscribe(
      (response: ApplicationDTO[]) => {
        this.applications = response;
        this.nr_applications = response.length;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  goToJobPage(jobId: number): void {
    this.router.navigate(['/job/details'], {
      queryParams: {'jobId': jobId}
    });
  }

  public openJobDetailsModal(jobId: number): void{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "40%";
    dialogConfig.height = "90%";
    dialogConfig.data = {jobId: jobId};
    this.dialog.open(JobDetailsComponent, dialogConfig);
  }

  ngOnInit(): void {
    this.getEmployeeApplications();
  }

}
