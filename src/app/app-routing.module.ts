import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddJobComponent } from './add-job/add-job.component';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './auth/authentication/authentication.component';
import { LoginComponent } from './auth/login/login.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { HomeComponent } from './home/home.component';
import { JobsComponent } from './jobs/jobs.component';
import {RecruiterJobsComponent} from "./recruiter-jobs/recruiter-jobs.component";
import {EditJobComponent} from "./edit-job/edit-job.component";
import {JobPageComponent} from "./job-page/job-page.component";

const routes: Routes = [
  {
    path: '',
    component: AppComponent
  },
  {
    path: 'authenticate',
    component: AuthenticationComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'jobs',
    component: JobsComponent
  },
  {
    path: 'job/add',
    component: AddJobComponent
  },
  {
    path: 'user/edit',
    component: EditUserComponent
  },
  {
    path: 'myjobs',
    component: RecruiterJobsComponent
  },
  {
    path: 'job/edit',
    component: EditJobComponent
  },
  {
    path: 'job/details',
    component: JobPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
