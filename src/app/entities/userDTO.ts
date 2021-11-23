export class UserDTO{
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  phoneNumber: string;
  contactMethod: string;

  constructor(id: number, firstName: string, lastName: string,
              email: string, phoneNumber: string, contactMethod: string, role: string){
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.contactMethod = contactMethod
    this.role = role;
  }

}
