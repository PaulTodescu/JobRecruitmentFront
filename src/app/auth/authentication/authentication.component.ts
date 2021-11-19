import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  flag: boolean = true

  backgroundImage:string = 'assets/img/banner.jpg';

  constructor() { }

  switchBetweenLoginRegister(option:string){
    if(option == 'login'){
      this.flag = true;
    } else {
      this.flag = false;
    }
  }

  ngOnInit(): void {
  }

}
