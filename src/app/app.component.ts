import { Component } from '@angular/core';
import { flush } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Job Recruitment';

  constructor(
    private titleService: Title,
    private router: Router){ }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  ngOnInit(): void {
    this.setTitle('HireNeed');
  }
}
