import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryDTO } from 'src/app/entities/categoryDTO';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  public getCategories(): Observable<CategoryDTO[]>{
    return this.http.get<CategoryDTO[]>(`${this.apiUrl}/category/all`);
  }

  public getCategoryByName(categoryName: string): Observable<CategoryDTO>{
    return this.http.get<CategoryDTO>(`${this.apiUrl}/category/${categoryName}`);
  }
}
