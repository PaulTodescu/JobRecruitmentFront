import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationRequest } from 'src/app/entities/authenticationRequest';
import { AuthenticationResponse } from 'src/app/entities/AuthenticationResponse';
import { User } from 'src/app/entities/user';
import {Job} from "../../entities/job";
import {UserDTO} from "../../entities/userDTO";
import {Application} from "../../entities/application";

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

  public getLoggedInUser(): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${this.apiUrl}/user/info`);
  }

  public editUser(user: UserDTO){
    return this.http.put<UserDTO>(`${this.apiUrl}/user`, user);
  }

  public getLoggedInUserRole(): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/user/role`, { responseType: 'text' as 'json'});
  }

  public loggedIn(): boolean {
    return !!localStorage.getItem('token')
  }

  public checkIfLoggedInUserIsRecruiter(): Observable<boolean>{
    return this.http.get<boolean>(`${this.apiUrl}/user/role/recruiter`);
  }

  public checkIfLoggedInUserIsEmployee(): Observable<boolean>{
    return this.http.get<boolean>(`${this.apiUrl}/user/role/employee`);
  }

  public getEmployeeApplications(employeeId: number): Observable<Application[]>{
    return this.http.get<Application[]>(`${this.apiUrl}/user/employee/${employeeId}/applications`);
  }

}
