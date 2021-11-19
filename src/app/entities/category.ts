import { Job } from "./job";

export class Category{
    id: number;
    name: string;
    jobs: Job[]

    constructor(id: number, name: string, jobs: Job[]){
        this.id = id;
        this.name = name;
        this.jobs = jobs;
    }
}