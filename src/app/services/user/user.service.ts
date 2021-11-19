import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationComponent } from 'src/app/auth/authentication/authentication.component';
import { AuthenticationRequest } from 'src/app/entities/authenticationRequest';
import { AuthenticationResponse } from 'src/app/entities/AuthenticationResponse';
import { User } from 'src/app/entities/user';

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
    return this.http.get<any>(`${this.apiUrl}/user/info`, { responseType: 'text' as 'json'});
  }

  public getUsernameByEmail(email: string){
    return this.http.get<any>(`${this.apiUrl}/user?email=${email}`, { responseType: 'text' as 'json'});
  }

}
