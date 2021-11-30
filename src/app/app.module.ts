import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';

import { AuthenticationComponent } from './auth/authentication/authentication.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthInterceptorProvider } from './services/authentication/auth.interceptor';
import { HttpClientModule } from '@angular/common/http';
import { JobsComponent } from './jobs/jobs.component';
import { AddJobComponent } from './add-job/add-job.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { RecruiterJobsComponent } from './recruiter-jobs/recruiter-jobs.component';
import { EditJobComponent } from './edit-job/edit-job.component';
import { JobPageComponent } from './job-page/job-page.component';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ButtonModule} from 'primeng/button';
import { JobDetailsComponent } from './job-details/job-details.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    JobsComponent,
    AddJobComponent,
    EditUserComponent,
    RecruiterJobsComponent,
    EditJobComponent,
    JobPageComponent,
    JobDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatRadioModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    HttpClientModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule,
    InputTextareaModule,
    ButtonModule,
    MatToolbarModule
  ],

  providers: [AuthInterceptorProvider],

  bootstrap: [AppComponent]
})
export class AppModule { }
