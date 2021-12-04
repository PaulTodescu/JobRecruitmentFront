import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './auth/authentication/authentication.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { HomeComponent } from './home/home.component';
import { JobsComponent } from './jobs/jobs.component';
import {RecruiterJobsComponent} from "./recruiter-jobs/recruiter-jobs.component";
import {JobPageComponent} from "./job-page/job-page.component";
import {BaseGuard} from "./guards/base.guard";
import {AuthGuard} from "./guards/auth.guard";
import {RecruiterGuard} from "./guards/recruiter-guard.guard";
import {EmployeeGuard} from "./guards/employee.guard";
import {EmployeeApplicationsComponent} from "./employee-applications/employee-applications.component";

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    canActivate: [BaseGuard]
  },
  {
    path: 'authenticate',
    component: AuthenticationComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'jobs',
    component: JobsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user/edit',
    component: EditUserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'myjobs',
    component: RecruiterJobsComponent,
    canActivate: [AuthGuard, RecruiterGuard]
  },
  {
    path: 'job/details',
    component: JobPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'myapplications',
    component: EmployeeApplicationsComponent,
    canActivate: [EmployeeGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
