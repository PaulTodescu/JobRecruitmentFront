import {Component, Inject, Injector, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {CategoryService} from "../services/category/category.service";
import {JobService} from "../services/job/job.service";
import {ActivatedRoute} from "@angular/router";
import {Job} from "../entities/job";
import {HttpErrorResponse} from "@angular/common/http";
import {CategoryDTO} from "../entities/categoryDTO";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {UserDTO} from "../entities/userDTO";
import {UserService} from "../services/user/user.service";
import {Application} from "../entities/application";

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {

  jobToDisplay: Job | undefined;
  categories: CategoryDTO[] | undefined;


  detailsJobForm = this.formBuilder.group({
    title: [],
    description: [],
    salary: [],
    salaryCurrency: [],
    salaryType: [],
    companyName: [],
    location: [],
    categoryId: [],
    createdAt: []
  });

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private userService: UserService,
    private jobService: JobService,
    @Inject(MAT_DIALOG_DATA) public data: { jobId: number }) {}

  private getJobToDisplay(jobId: number) {
    this.jobService.getJobById(jobId).subscribe(
      (response: Job) => {
        this.jobToDisplay = response;
        this.setInitialValues(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public setInitialValues(job: Job) {
    let salary: any;
    let salaryCurrency: string;
    let salaryType: string;
    if (job.salary === null || job.salary === undefined || job.salary === 0){
      salary = 'Not Provided';
    } else {
      salary = job.salary;
    }
    if (job.salaryCurrency === null || job.salaryCurrency === undefined || job.salaryCurrency.length === 0){
      salaryCurrency = 'Not Provided';
    } else {
      salaryCurrency = job.salaryCurrency;
    }
    if (job.salaryType === null || job.salaryType === undefined || job.salaryType.length === 0){
      salaryType = 'Not Provided';
    } else {
      salaryType = job.salaryType;
    }
    this.detailsJobForm.patchValue({
      title: job.title,
      description: job.description,
      salary: salary,
      salaryCurrency: salaryCurrency,
      salaryType: salaryType,
      companyName: job.companyName,
      location: job.location,
      categoryId: job.categoryId.toString(),
      createdAt: job.createdAt
    })
  }

  public getCategories(): void{
    this.categoryService.getCategories().subscribe(
      (response: CategoryDTO[]) => {
        this.categories = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  ngOnInit(): void {
    this.detailsJobForm.controls['title'].disable();
    this.detailsJobForm.controls['description'].disable();
    this.detailsJobForm.controls['salary'].disable();
    this.detailsJobForm.controls['salaryCurrency'].disable();
    this.detailsJobForm.controls['salaryType'].disable();
    this.detailsJobForm.controls['companyName'].disable();
    this.detailsJobForm.controls['location'].disable();
    this.detailsJobForm.controls['categoryId'].disable();
    this.detailsJobForm.controls['createdAt'].disable();

    this.getJobToDisplay(this.data.jobId);
    this.getCategories();
  }

}
