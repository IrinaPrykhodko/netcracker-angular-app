import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MedicineInstance} from '../../../../models/medicineInstance';

@Component({
  selector: 'app-medicine-kit-item',
  templateUrl: './medicine-kit-item.component.html',
  styleUrls: ['./medicine-kit-item.component.scss']
})
export class MedicineKitItemComponent implements OnInit {

  public medicineKitItemForm: FormGroup;
  @Input() medicineInstance: MedicineInstance;
  @Output() ItemDelete = new EventEmitter();
  @Output() MedicineKitItemFormSubmitted = new EventEmitter();

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.medicineKitItemForm = this.formBuilder.group({
      selfLife: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.min(0)]]
    });

    if (this.medicineInstance) {
      this.medicineKitItemForm.patchValue({
        selfLife: this.medicineInstance.selfLife,
        amount: this.medicineInstance.amount
      });
    }
  }

  deleteItem(id: number) {
    this.ItemDelete.emit(id);
  }

  submit() {
    this.MedicineKitItemFormSubmitted.emit(this.medicineKitItemForm.value);
  }

  get selfLife() {
    return this.medicineKitItemForm.get('selfLife');
  }

  get amount() {
    return this.medicineKitItemForm.get('amount');
  }
}
