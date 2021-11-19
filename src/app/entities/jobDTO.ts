
export class JobDTO{
    id: number;
    title: string;
    createdAt: string;
    companyName: string;
    location: string;

    constructor(id: number, title: string, createdAt: string, companyName: string, location: string){
            this.id = id;
            this.title = title;
            this.createdAt = createdAt;
            this.companyName = companyName;
            this.location = location;
        }

}