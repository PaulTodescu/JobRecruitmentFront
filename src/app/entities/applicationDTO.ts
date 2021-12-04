import {Job} from "./job";
import {User} from "./user";

export class ApplicationDTO{
  id: number;
  createdAt: string;
  job: Job;

  constructor(id: number, createdAt: string, job: Job){
    this.id = id;
    this.createdAt = createdAt;
    this.job = job;
  }
}
