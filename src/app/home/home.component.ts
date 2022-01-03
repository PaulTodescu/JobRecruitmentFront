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
  categories: CategoryDTO[] | undefined;

  constructor(
    private categoryService: CategoryService,
    private router: Router) { }

  public getCategories(): void{
    this.categoryService.getCategories().subscribe(
      (response: CategoryDTO[]) => {
        this.categories = response;
        this.nr_categories = response.length;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }

  public getCategoriesRow(index: number): CategoryDTO[]{
    if (this.categories != undefined){
      let startIndex = index * 6;
      let endIndex = startIndex + 6;
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
