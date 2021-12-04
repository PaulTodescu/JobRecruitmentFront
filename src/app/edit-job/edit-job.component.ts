import {Component, Inject, Injector, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoryDTO} from "../entities/categoryDTO";
import {CategoryService} from "../services/category/category.service";
import {HttpErrorResponse} from "@angular/common/http";
import {JobService} from "../services/job/job.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Job} from "../entities/job";
import Swal from "sweetalert2";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.scss']
})
export class EditJobComponent implements OnInit {

  isSalaryFieldEmpty: boolean = false;
  categories: CategoryDTO[] | undefined;
  jobToEdit: Job | undefined;
  imagePath: string | undefined;
  jobImage: File | undefined;

  editJobForm = this.formBuilder.group({
    title:['', [Validators.required, Validators.minLength(5), Validators.pattern(/^(?:[a-zA-Z0-9\s]+)?$/)]],
    description:['', [Validators.required, Validators.minLength(20)]],
    salary:[undefined, [Validators.pattern("^[0-9]*$")]],
    salaryCurrency:[undefined],
    salaryType:[undefined],
    createdAt:[],
    companyName:['', [Validators.required, Validators.minLength(5), Validators.pattern(/^(?:[a-zA-Z0-9\s]+)?$/)]],
    location:['', [Validators.required, Validators.minLength(5)]],
    categoryId:['', [Validators.required]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private jobService: JobService,
    private injector: Injector,
    @Inject(MAT_DIALOG_DATA) public data: { jobId: number }) {
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
      && this.jobToEdit?.companyName !== undefined && this.jobToEdit.location !== undefined
      && this.editJobForm){
      this.jobService.editJob(editJobForm.value, this.jobToEdit.id).subscribe(
        () => {
          this.onSuccess();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )
      this.jobService.assignImageToJob(this.jobToEdit.id, this.jobImage).subscribe(
        () => {
          console.log(this.jobImage);
        },
        (error: HttpErrorResponse) => {
          alert(error.message)
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
        salary:null,
        salaryCurrency:null,
        salaryType:null
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
      companyName: job.companyName,
      location: job.location,
      categoryId:job.categoryId.toString()

    })

    this.checkIfSalaryIsDefined();
  }

  public onSuccess(): void {
    let router: Router = this.injector.get(Router);
    let dialogRef: MatDialogRef<EditJobComponent> = this.injector.get(MatDialogRef);
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Job was updated',
      showConfirmButton: false,
      timer: 2000
    }).then(function(){
      dialogRef.close();
      location.reload();
      // router.navigateByUrl("myjobs");
    })
  }

  private getJobImageName(jobId: any) {
    this.jobService.getImageNameForJob(jobId).subscribe(
      (response: string) => {
        this.imagePath = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    )
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
    if (this.editJobForm.get('title')?.hasError('required')){
      return 'you must enter a value';
    }
    else if (this.editJobForm.get('title')?.hasError('minlength')){
      return 'enter at least 5 characters';
    }
    else if (this.editJobForm.get('title')?.invalid){
      return 'only alphabetical characters and digits are allowed';
    }
    return;
  }

  getFormDescriptionErrorMessage() {
    if (this.editJobForm.get('description')?.hasError('required')){
      return 'you must enter a value';
    }
    else if (this.editJobForm.get('description')?.hasError('minlength')){
      return 'enter at least 20 characters';
    }
    else if (this.editJobForm.get('description')?.invalid){
      return 'only alphabetical characters and digits are allowed';
    }
    return;
  }

  getFormSalaryErrorMessage() {
    if (this.editJobForm.get('salary')?.invalid){
      return 'only digits are allowed';
    }
    return;
  }

  getFormCompanyNameErrorMessage() {
    if (this.editJobForm.get('companyName')?.hasError('required')){
      return 'you must enter a value';
    }
    else if (this.editJobForm.get('companyName')?.hasError('minlength')){
      return 'enter at least 5 characters';
    }
    else if (this.editJobForm.get('companyName')?.invalid){
      return 'only alphabetical characters and digits are allowed';
    }
    return;
  }

  getFormLocationErrorMessage() {
    if (this.editJobForm.get('location')?.hasError('required')){
      return 'you must enter a value';
    }
    else if (this.editJobForm.get('location')?.hasError('minlength')){
      return 'enter at least 5 characters';
    }
    return;
  }

  ngOnInit(): void {
    this.checkIfSalaryIsDefined();
    this.getCategories();
    this.getJobToEdit(this.data.jobId);
    this.getJobImageName(this.data.jobId);
  }

}
