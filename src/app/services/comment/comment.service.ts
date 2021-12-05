import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {JobComment} from "../../entities/comment";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  public addCommentToJob(jobId: number, content: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/comment/job/${jobId}`, content);
  }

  public getCommentsForJob(jobId: number): Observable<JobComment[]> {
    return this.http.get<JobComment[]>(`${this.apiUrl}/comment/job/${jobId}/all`)
  }
}
