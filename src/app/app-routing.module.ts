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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
