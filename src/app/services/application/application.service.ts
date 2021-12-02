import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Application} from "../../entities/application";

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  public sendApplication(employeeId: number, jobId: number, cv: File | undefined): Observable<void>{
    const formData = new FormData();
    // @ts-ignore
    formData.append("cv", cv);
    return this.http.post<void>(`${this.apiUrl}/application/employee/${employeeId}/job/${jobId}`,formData);
  }

}
