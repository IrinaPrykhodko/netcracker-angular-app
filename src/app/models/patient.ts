import {User} from "./user";

export class Patient extends User{
  firstName: string;
  lastName: string;
  dateOfBirth: any;
  gender: any;
  height: number;
  weight: number;
  location: string;
  phoneNumber: number;
  passwordConfirm: string;
}
