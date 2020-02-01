import {Medicine} from './medicine';
import {Prescription} from './prescription';

export class PrescriptionItem {
  id: number;
  medicine: Medicine;
  startDate: Date;
  endDate: Date;
  takingTime: string;
  description: string;
  prescription: Prescription;
  isReminderEnabled: boolean;
  dosage: number;
}
