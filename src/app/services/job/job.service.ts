import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from 'src/app/entities/job';
import { JobDTO } from 'src/app/entities/jobDTO';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  public addJob(job: Job): Observable<number>{
    return this.http.post<number>(`${this.apiUrl}/job`, job);
  }

  public assignJobToCategory(jobId: number, categoryId: number): Observable<void>{
    return this.http.put<void>(`${this.apiUrl}/job/${jobId}/category/${categoryId}`, null);
  }

  public assignImageToJob(jobId: number, image: File | undefined): Observable<void>{
    const formData = new FormData();
    // @ts-ignore
    formData.append("image", image);
    return this.http.post<void>(`${this.apiUrl}/job/${jobId}/image`, formData);
  }

  public getJobsForCategory(categoryId: number): Observable<JobDTO[]>{
    return this.http.get<JobDTO[]>(`${this.apiUrl}/category/${categoryId}/jobs`)
  }

  public getJobById(jobId: number): Observable<Job>{
    return this.http.get<Job>(`${this.apiUrl}/job/${jobId}`);
  }

  public editJob(job: Job, jobId: number){
    return this.http.put<Job>(`${this.apiUrl}/job/${jobId}`, job);
  }

  public deleteJob(jobId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/job/${jobId}`);
  }

  public getJobImage(jobId: number): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/job/${jobId}/image`, {responseType: 'text' as 'json'});
  }

  public getImageNameForJob(jobId: number){
    return this.http.get<any>(`${this.apiUrl}/job/${jobId}/image/name`, {responseType: 'text' as 'json'});
  }

}
