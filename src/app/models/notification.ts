import {Medicine} from "./medicine";
import {PrescriptionItem} from "./prescriptionItem";

export class Notification{
  id: number;
  type: string;
  remindTime: string;
  medicineInstanceId: Medicine;
  prescriptionItemId: PrescriptionItem;
  message: string;
}
