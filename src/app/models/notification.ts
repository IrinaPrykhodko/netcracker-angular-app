import {Medicine} from './medicine';

export class Notification {
  id: number;
  userId: number;
  type: string;
  remindTime: Date;
  medicineInstanceId: Medicine;
  prescriptionItemId: number;
  message: string;
}
