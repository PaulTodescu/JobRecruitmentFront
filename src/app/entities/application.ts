import {Job} from "./job";
import {User} from "./user";

export class Application{
  id: number;
  createdAt: string;
  job: Job;
  employee: User;

  constructor(id: number, createdAt: string, job: Job, employee: User){
    this.id = id;
    this.createdAt = createdAt;
    this.job = job;
    this.employee = employee;
  }
}
