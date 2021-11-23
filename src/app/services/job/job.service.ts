import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from 'src/app/entities/job';
import { JobDTO } from 'src/app/entities/jobDTO';

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

  public getJobsForCategory(categoryId: number): Observable<JobDTO[]>{
    return this.http.get<JobDTO[]>(`${this.apiUrl}/category/${categoryId}/jobs`)
  }

  public getJobById(jobId: number): Observable<Job>{
    return this.http.get<Job>(`${this.apiUrl}/job/${jobId}`);
  }

  public editJob(job: Job){
    return this.http.put<Job>(`${this.apiUrl}/job/{jobId}`, job);
  }

}
