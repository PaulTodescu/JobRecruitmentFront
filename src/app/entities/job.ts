export class Job{
    id: number;
    title: string;
    description: string;
    salary: number;
    salaryCurrency: string;
    salaryType: string;
    createdAt: string;
    companyName: string;
    location: string;

    constructor(id: number, title: string, description: string, salary: number, salaryCurrency: string, 
        salaryType: string, createdAt: string, companyName: string, location: string){
            this.id = id;
            this.title = title;
            this.description = description;
            this.salary = salary;
            this.salaryCurrency = salaryCurrency;
            this.salaryType = salaryType;
            this.createdAt = createdAt;
            this.companyName = companyName;
            this.location = location;
        }

}