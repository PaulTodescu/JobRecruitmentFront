export class JobComment{
  id: number;
  content: string;
  createdAt: string;
  author: string;

  constructor(id: number, createdAt: string, content: string, author: string){
    this.id = id;
    this.content = content;
    this.createdAt = createdAt;
    this.author = author;
  }
}
