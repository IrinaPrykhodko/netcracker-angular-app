import {Doctor} from './doctor';

export class Prescription {
  id?: number;
  name: string;
  doctor?: Doctor;
  date: Date;
}
