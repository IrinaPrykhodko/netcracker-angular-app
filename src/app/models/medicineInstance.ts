import {Medicine} from './medicine';

export class MedicineInstance {
  id: number;
  medicine: Medicine;
  selfLife: any;
  amount: number;
  isExpired?: boolean;
}
