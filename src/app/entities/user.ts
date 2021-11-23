export class User{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    contactMethod: string;
    password: string;
    role: string;

    constructor(id: number, firstName: string, lastName: string, email: string, phoneNumber: string,
  contactMethod: string, password: string, role: string){
            this.id = id;
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.phoneNumber = phoneNumber;
            this.contactMethod = contactMethod;
            this.password = password;
            this.role = role;
        }

}
