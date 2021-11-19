import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  editUserForm!:FormGroup;
  defaultRole = 'RECRUITER';

  constructor(private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.editUserForm = this.formBuilder.group({
      firstName: ['my first name'],
      lastName:['my last name'],
      email:[{value: 'my_email', disabled: true}],
      role: [{value: 'EMPLOYEE', disabled:  true}],
    })    
  }

  public editUser(editUserForm: FormGroup): void{
    alert("submiting...")
  }

}
