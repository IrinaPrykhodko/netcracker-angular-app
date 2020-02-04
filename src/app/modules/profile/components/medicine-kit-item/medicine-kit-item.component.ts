import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MedicineInstance} from "../../../../models/medicineInstance";

@Component({
  selector: 'app-medicine-kit-item',
  templateUrl: './medicine-kit-item.component.html',
  styleUrls: ['./medicine-kit-item.component.scss']
})
export class MedicineKitItemComponent implements OnInit {

  public medicineKitItemForm: FormGroup;
  public customPatterns = { '9': { pattern: new RegExp('^-?[0-9]')} };
  @Input() medicineInstance: MedicineInstance;
  @Output() onItemDelete = new EventEmitter();
  @Output() onMedicineKitItemFormSubmitted = new EventEmitter();
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.medicineKitItemForm = this.formBuilder.group({
      selfLife: ['', [Validators.required]],
      amount: ['', [Validators.required]]
    })
    if(this.medicineInstance){
      this.medicineKitItemForm.patchValue({
        selfLife: this.medicineInstance.selfLife,
        amount: this.medicineInstance.amount
      })
    }
  }

  deleteItem(id: number){
    this.onItemDelete.emit(id)
  }

  submit(){
    this.onMedicineKitItemFormSubmitted.emit(this.medicineKitItemForm.value);
  }

}
