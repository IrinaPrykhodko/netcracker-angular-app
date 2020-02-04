import {Medicine} from './medicine';

export class Notification {
  id: number;
  userId: number;
  type: string;
  remindTime: Date;
  medicineInstanceId: number;
  prescriptionItemId: number;
  message: string;
}
