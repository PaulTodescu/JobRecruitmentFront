import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryDTO } from '../entities/categoryDTO';
import { CategoryService } from '../services/category/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  bannerImage:string = 'assets/img/banner.png';

  nr_categories: number | undefined;
  nr_rows: number | undefined;
  categories: CategoryDTO[] | undefined;
  current_category: CategoryDTO | undefined;

  constructor(
    private categoryService: CategoryService,
    private router: Router) { }

  public getCategories(): void{
    this.categoryService.getCategories().subscribe(
      (response: CategoryDTO[]) => {
        this.categories = response;
        this.nr_categories = response.length;
        if (this.nr_categories % 6 == 0){
          this.nr_rows = Math.round(this.nr_categories / 6);
        } else {
          this.nr_rows = Math.round(this.nr_categories / 6 + 1);
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public getNumberRows(): Array<number>{
    return new Array(this.nr_rows);
  }

  public getCategoriesRow(index: number): CategoryDTO[]{
    if (this.categories != undefined){
      var startIndex = index * 6;
      var endIndex = startIndex + 6;
      return this.categories.slice(startIndex, endIndex)
    } else {
      return new Array(0);
    }
  }

  public goToJobsPage(categoryId: number | undefined): void{
    if (categoryId != undefined){    
      this.router.navigate(['/jobs'], {
        queryParams: {'categoryId': categoryId}
      });
    }
  }

  ngOnInit(): void {
    this.getCategories()
    
  }

}
