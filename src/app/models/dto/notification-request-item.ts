export class NotificationRequestItem {
  id: number;
  userId: number;
  type: string;
  remindTime: Date;
  medicineInstanceId: number;
  prescriptionItemId: number;
  message: string;
}
