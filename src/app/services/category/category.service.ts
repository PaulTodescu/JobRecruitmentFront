import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryDTO } from 'src/app/entities/categoryDTO';
import {Category} from "../../entities/category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  public getCategories(): Observable<CategoryDTO[]>{
    return this.http.get<CategoryDTO[]>(`${this.apiUrl}/category/all`);
  }

  public getCategoryById(categoryId: number): Observable<Category>{
    return this.http.get<Category>(`${this.apiUrl}/category/${categoryId}`);
  }

  public getCategoryByName(categoryName: string): Observable<CategoryDTO>{
    return this.http.get<CategoryDTO>(`${this.apiUrl}/category/${categoryName}`);
  }
}
