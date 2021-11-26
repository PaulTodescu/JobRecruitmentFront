import { Component, OnInit } from '@angular/core';
import {Job} from "../entities/job";
import {JobService} from "../services/job/job.service";
import {ActivatedRoute} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-job-page',
  templateUrl: './job-page.component.html',
  styleUrls: ['./job-page.component.scss']
})
export class JobPageComponent implements OnInit {

  job: Job | undefined;

  constructor(
    private jobService: JobService,
    private activatedRout: ActivatedRoute) {
      this.activatedRout.queryParams.subscribe(
        data => {
          this.getJob(data.jobId);
        }
      )
  }

  public getJob(jobId: number): void {
    this.jobService.getJobById(jobId).subscribe(
      (response: Job) => {
        this.job = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  ngOnInit(): void {
  }

}
