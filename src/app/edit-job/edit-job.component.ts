import {Component, Injector, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CategoryDTO} from "../entities/categoryDTO";
import {CategoryService} from "../services/category/category.service";
import {HttpErrorResponse} from "@angular/common/http";
import {JobService} from "../services/job/job.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Job} from "../entities/job";
import {UserDTO} from "../entities/userDTO";
import Swal from "sweetalert2";

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.scss']
})
export class EditJobComponent implements OnInit {

  isSalaryFieldEmpty: boolean = false;
  categories: CategoryDTO[] | undefined;
  jobToEdit: Job | undefined;

  editJobForm: FormGroup = this.formBuilder.group({
    title:[''],
    description:[''],
    salary:[undefined],
    salaryCurrency:[undefined],
    salaryType:[undefined],
    createdAt:[],
    companyName:[''],
    location:[''],
    // category:['']
  })

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private jobService: JobService,
    private activatedRout: ActivatedRoute,
    private injector: Injector) {
      this.activatedRout.queryParams.subscribe(
        data => {
          this.getJobToEdit(data.jobId);
        }
    )
  }

  public getJobToEdit(jobId: number): void{
    this.jobService.getJobById(jobId).subscribe(
      (response: Job) => {
        this.jobToEdit = response;
        this.setInitialValues(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onEditJob(editJobForm: FormGroup): void{
    if (this.jobToEdit?.title !== undefined && this.jobToEdit?.description !== undefined
      && this.jobToEdit?.companyName !== undefined && this.jobToEdit.location !== undefined){
      this.jobService.editJob(editJobForm.value).subscribe(
        (response: Job) => {
          this.onSuccess();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )
    }
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

  checkIfSalaryIsDefined(): void {
    let salary = this.editJobForm.get('salary')?.value;
    if (salary === null || salary === undefined || salary.length === 0){
      this.isSalaryFieldEmpty = false;
      this.editJobForm.controls['salaryCurrency'].disable();
      this.editJobForm.controls['salaryType'].disable();
      this.editJobForm.patchValue({
        salaryCurrency: '',
        salaryType:''
      })
    } else {
      this.isSalaryFieldEmpty = true;
      this.editJobForm.controls['salaryCurrency'].enable();
      this.editJobForm.controls['salaryType'].enable();
    }
  }

  public setInitialValues(job: Job){
    this.editJobForm.patchValue({
      title: job.title,
      description: job.description,
      salary: job.salary,
      salaryCurrency: job.salaryCurrency,
      salaryType: job.salaryType,
      createdAt: job.createdAt,
      companyName: job.companyName,
      location: job.location
    })

    this.checkIfSalaryIsDefined();
  }

  public onSuccess(): void {
    let router: Router = this.injector.get(Router);
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your profile was updated',
      showConfirmButton: false,
      timer: 2000
    }).then(function(){
      router.navigateByUrl("home");
    })
  }

  ngOnInit(): void {
    this.checkIfSalaryIsDefined();
    this.getCategories();
  }

}
