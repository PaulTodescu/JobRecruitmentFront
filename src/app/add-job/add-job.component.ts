import {HttpErrorResponse} from '@angular/common/http';
import {Component, Injector, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {CategoryDTO} from '../entities/categoryDTO';
import {CategoryService} from '../services/category/category.service';
import {JobService} from '../services/job/job.service';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss']
})
export class AddJobComponent implements OnInit {

  categories: CategoryDTO[] | undefined;
  router: Router | undefined;
  isSalaryFieldEmpty: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private jobService: JobService,
    private injector: Injector) {}

  addJobForm: FormGroup = this.formBuilder.group({
    title:[''],
    description:[''],
    salary:[undefined],
    salaryCurrency:[undefined],
    salaryType:[undefined],
    createdAt:[],
    companyName:[''],
    location:[''],
    category:['']
  })

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

  public addJob(addJobForm: FormGroup): void{

    let title: string = this.addJobForm.get('title')?.value;
    let description: string = this.addJobForm.get('description')?.value;
    let salary: number = this.addJobForm.get('salary')?.value;
    let salaryCurrency: string = this.addJobForm.get('salaryCurrency')?.value;
    let salaryType: string = this.addJobForm.get('salaryType')?.value;
    let companyName: string = this.addJobForm.get('companyName')?.value;
    let location: string = this.addJobForm.get('location')?.value;
    let categoryId: number = this.addJobForm.get('category')?.value;

    this.addJobForm.setValue({
      title: title,
      description: description,
      salary: salary,
      salaryCurrency: salaryCurrency,
      salaryType: salaryType,
      createdAt: new Date(),
      companyName: companyName,
      location: location,
      category:categoryId
    })

    this.jobService.addJob(addJobForm.value).subscribe(
      (jobIdResponse: number) => {
        this.jobService.assignJobToCategory(jobIdResponse, categoryId).subscribe(
          () => {
            this.onSuccess();
          },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
        )
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  checkIfSalaryIsDefined(): void {
    let salary = this.addJobForm.get('salary')?.value;
    if (salary === null || salary === undefined || salary.length === 0){
      this.isSalaryFieldEmpty = false;
      this.addJobForm.controls['salaryCurrency'].disable();
      this.addJobForm.controls['salaryType'].disable();
      this.addJobForm.patchValue({
        salary: null,
        salaryCurrency: null,
        salaryType: null
      })
    } else {
      this.isSalaryFieldEmpty = true;
      this.addJobForm.controls['salaryCurrency'].enable();
      this.addJobForm.controls['salaryType'].enable();
    }
  }

  public onSuccess(): void {
    let router: Router = this.injector.get(Router);
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Job added successfully',
      showConfirmButton: false,
      timer: 2000
    }).then(function(){
      router.navigateByUrl("home");
    })
  }

  ngOnInit(): void {
    this.checkIfSalaryIsDefined()
    this.getCategories();
  }

}
