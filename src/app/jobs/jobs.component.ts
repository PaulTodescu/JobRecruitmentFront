import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobDTO } from '../entities/jobDTO';
import { JobService } from '../services/job/job.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  categoryId: number | undefined;
  jobs: JobDTO[] | undefined;
  nr_jobs: number | undefined;

  constructor(
    private jobService: JobService,
    private activatedRout: ActivatedRoute) { 
      this.activatedRout.queryParams.subscribe(
        data => {
          this.getJobsForCategory(data.categoryId);
        }
      )
    }

  public getJobsForCategory(categoryId: number): void{
    this.jobService.getJobsForCategory(categoryId).subscribe(
      (response: JobDTO[]) => {
        this.jobs = response;
        this.nr_jobs = response.length;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }


  ngOnInit(): void {
  }

}
