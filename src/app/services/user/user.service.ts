import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationRequest } from 'src/app/entities/authenticationRequest';
import { AuthenticationResponse } from 'src/app/entities/AuthenticationResponse';
import { User } from 'src/app/entities/user';
import {Job} from "../../entities/job";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  public registerUser(user: User): Observable<void>{
    return this.http.post<void>(`${this.apiUrl}/user/register`, user);
  }

  public loginUser(authenticationRequest: AuthenticationRequest): Observable<AuthenticationResponse>{
    return this.http.post<AuthenticationResponse>(`${this.apiUrl}/authenticate`, authenticationRequest);
  }

  public getUsername(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/user/name`, { responseType: 'text' as 'json'});
  }

  public getUsernameByEmail(email: string){
    return this.http.get<any>(`${this.apiUrl}/user?email=${email}`, { responseType: 'text' as 'json'});
  }

  public getJobsForCurrentUser(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.apiUrl}/user/jobs`);
  }

  // public getLoggedInUser()

}
