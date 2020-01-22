import {User} from './user';

export class Doctor extends User {
  name: string;
  surname: string;
  speciality: string;
  birthDate: Date;
  workExperience: string;
  workPlace: string;
  phoneNumber: string;
}
