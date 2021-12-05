import {HttpErrorResponse} from '@angular/common/http';
import {Component, Injector, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {CategoryDTO} from '../entities/categoryDTO';
import {CategoryService} from '../services/category/category.service';
import {JobService} from '../services/job/job.service';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss']
})
export class AddJobComponent implements OnInit {

  categories: CategoryDTO[] | undefined;
  router: Router | undefined;
  isSalaryFieldEmpty: boolean = false;
  imagePath: string = 'Default';
  jobImage: File | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private jobService: JobService,
    private injector: Injector) {}

  addJobForm: FormGroup = this.formBuilder.group({
    title:['', [Validators.required, Validators.minLength(5), Validators.pattern(/^(?:[a-zA-Z0-9\s]+)?$/)]],
    description:['', [Validators.required, Validators.minLength(20)]],
    salary:[undefined, [Validators.pattern("^[0-9]*$")]],
    salaryCurrency:[undefined],
    salaryType:[undefined],
    createdAt:[],
    companyName:['', [Validators.required, Validators.minLength(5), Validators.pattern(/^(?:[a-zA-Z0-9\s]+)?$/)]],
    location:['', [Validators.required, Validators.minLength(5)]],
    category:['', [Validators.required]]
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
        this.jobService.assignImageToJob(jobIdResponse, this.jobImage).subscribe(
          () => {
            console.log(this.jobImage);
          },
          (error: HttpErrorResponse) => {
            alert(error.message)
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
    let dialogRef: MatDialogRef<AddJobComponent> = this.injector.get(MatDialogRef);
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Job added successfully',
      showConfirmButton: false,
      timer: 2000
    }).then(function(){
      dialogRef.close();
    })
  }

  uploadFile(event: Event) {
    this.imagePath = 'Default';
    this.jobImage = undefined;
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.imagePath = fileList[0].name;
      this.jobImage = fileList[0];
    }
  }

  getFormTitleErrorMessage() {
    if (this.addJobForm.get('title')?.hasError('required')){
      return 'you must enter a value';
    }
    else if (this.addJobForm.get('title')?.hasError('minlength')){
      return 'enter at least 5 characters';
    }
    else if (this.addJobForm.get('title')?.invalid){
      return 'only alphabetical characters and digits are allowed';
    }
    return;
  }

  getFormDescriptionErrorMessage() {
    if (this.addJobForm.get('description')?.hasError('required')){
      return 'you must enter a value';
    }
    else if (this.addJobForm.get('description')?.hasError('minlength')){
      return 'enter at least 20 characters';
    }
    else if (this.addJobForm.get('description')?.invalid){
      return 'only alphabetical characters and digits are allowed';
    }
    return;
  }

  getFormSalaryErrorMessage() {
    if (this.addJobForm.get('salary')?.invalid){
      return 'only digits are allowed';
    }
    return;
  }

  getFormCompanyNameErrorMessage() {
    if (this.addJobForm.get('companyName')?.hasError('required')){
      return 'you must enter a value';
    }
    else if (this.addJobForm.get('companyName')?.hasError('minlength')){
      return 'enter at least 5 characters';
    }
    else if (this.addJobForm.get('companyName')?.invalid){
      return 'only alphabetical characters and digits are allowed';
    }
    return;
  }

  getFormLocationErrorMessage() {
    if (this.addJobForm.get('location')?.hasError('required')){
      return 'you must enter a value';
    }
    else if (this.addJobForm.get('location')?.hasError('minlength')){
      return 'enter at least 5 characters';
    }
    return;
  }

  getFormCategoryErrorMessage() {
    if (this.addJobForm.get('category')?.hasError('required')){
      return 'you must select a value';
    }
    return;
  }

  ngOnInit(): void {
    this.checkIfSalaryIsDefined()
    this.getCategories();
  }

}
