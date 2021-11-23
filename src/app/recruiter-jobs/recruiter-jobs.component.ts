import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user/user.service";
import {Job} from "../entities/job";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

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
    private router: Router) { }

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
    this.router.navigateByUrl('job/add');
  }

  goToEditJob(jobId: number | undefined): void{
    if (jobId !== undefined){
      this.router.navigate(['job/edit'], {
        queryParams: {'jobId': jobId}
      });
    }
  }

  ngOnInit(): void {
    this.getJobsForCurrentUser();
  }

}
