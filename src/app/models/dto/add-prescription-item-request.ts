export class AddPrescriptionItemRequest {
  prescriptionId: number;
  medicineId: number;
  startDate: Date;
  endDate: Date;
  takingDurationDays: number;
  takingTime: string;
  description: string;
  isReminderEnabled: boolean;
  dosage: number;
}
