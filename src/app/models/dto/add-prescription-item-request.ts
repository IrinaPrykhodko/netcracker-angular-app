export class AddPrescriptionItemRequest {
  prescriptionId: number;
  medicineId: number;
  startDate: Date;
  endDate: Date;
  takingTime: string;
  description: string;
  isReminderEnabled: boolean;
  dosage: number;
}
