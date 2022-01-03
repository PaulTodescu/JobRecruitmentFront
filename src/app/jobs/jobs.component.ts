import {HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {JobDTO} from '../entities/jobDTO';
import {JobService} from '../services/job/job.service';
import {Category} from "../entities/category";
import {CategoryService} from "../services/category/category.service";

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {


  categoryId: number | undefined;
  categoryName: string | undefined;
  jobs: JobDTO[] | undefined;
  nr_jobs: number = 0;

  constructor(
    private jobService: JobService,
    private categoryService: CategoryService,
    private router: Router,
    private activatedRout: ActivatedRoute) {
      this.activatedRout.queryParams.subscribe(
        data => {
          this.getJobsForCategory(data.categoryId);
        }
      )
    }

  public getJobsForCategory(categoryId: number): void{
    this.categoryService.getCategoryById(categoryId).subscribe(
      (response: Category) => {
        console.log(response);
        this.categoryName = response.name;
        this.jobs = response.jobs;
        this.nr_jobs = response.jobs.length;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }

  public getNumberDaysAgo(createdAt: string): number{
    let createdAt_arr = createdAt.split('/');
    let day = parseInt(createdAt_arr[0]);
    let month = parseInt(createdAt_arr[1]);
    let year = parseInt(createdAt_arr[2]);
    let formatted_date = month + '/' + day + '/' + year;
    let createdAt_date = new Date(formatted_date);
    let current = new Date()
    let difference_in_millis = current.getTime() - createdAt_date.getTime();
    return Math.trunc(difference_in_millis / (60000 * 60 * 24));

  }

  public goToJobDetailsPage(jobId: number){
    this.router.navigate(['/job/details'], {
      queryParams: {'jobId': jobId}
    });
  }

  ngOnInit(): void {
  }

}
