import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user/user.service";
import {JobService} from "../services/job/job.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ApplicationDTO} from "../entities/applicationDTO";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {JobDetailsComponent} from "../job-details/job-details.component";
import {ngxCsv} from "ngx-csv";

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
        console.log(error.message);
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

  public downloadApplicationsCsv(): void {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: false,
      title: '',
      useBom: true,
      noDownload: false,
      headers: ["Applied On", "Title", "Offered By", "Location", "Salary", "Currency", "Type", "Description"]
    };

    if (this.applications !== undefined) {
      let csvData = [];
      for (let i = 0; i < this.applications.length; i++){
        if (this.applications[i].job.salary === null){
          this.applications[i].job.salary = 0;
        }
        if (this.applications[i].job.salaryCurrency === null){
          this.applications[i].job.salaryCurrency = 'none';
        }
        if (this.applications[i].job.salaryType === null){
          this.applications[i].job.salaryType = 'none';
        }
        let entry = {
          "createdAt": this.applications[i].createdAt,
          "title": this.applications[i].job.title,
          "companyName": this.applications[i].job.companyName,
          "location": this.applications[i].job.location,
          "salary": this.applications[i].job.salary,
          "salaryCurrency": this.applications[i].job.salaryCurrency,
          "salaryType": this.applications[i].job.salaryType,
          "description": this.applications[i].job.description
        };
        csvData.push(entry);
      }
      let today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      const yyyy = today.getFullYear();

      let title = 'Applications-' + dd + '-' + mm + '-' + yyyy;

      new ngxCsv(csvData, title, options);
    }

  }

  ngOnInit(): void {
    this.getEmployeeApplications();
  }

}
