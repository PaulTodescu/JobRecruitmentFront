export class JobUpdateDTO{
  id: number;
  title: string;
  description: string;
  salary: number;
  salaryCurrency: string;
  salaryType: string;
  createdAt: string;
  companyName: string;
  location: string;
  categoryId: number;

  constructor(id: number, title: string, description: string, salary: number, salaryCurrency: string,
              salaryType: string, createdAt: string, companyName: string, location: string, categoryId: number){
    this.id = id;
    this.title = title;
    this.description = description;
    this.salary = salary;
    this.salaryCurrency = salaryCurrency;
    this.salaryType = salaryType;
    this.createdAt = createdAt;
    this.companyName = companyName;
    this.location = location;
    this.categoryId = categoryId;
  }

}
