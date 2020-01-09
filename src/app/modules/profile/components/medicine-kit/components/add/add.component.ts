import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MedicineInstance} from '../../../../../../models/medicineInstance';
import {MedicineKitService} from '../../../../../../services/medicine-kit.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  public medicineInstance: MedicineInstance = new MedicineInstance();
  public addForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private medicineKitService: MedicineKitService) {
  }

  ngOnInit() {
    console.log(this.medicineInstance);

    this.addForm = this.formBuilder.group({
      name: [this.medicineInstance.name, [Validators.required]],
      manufacturer: [this.medicineInstance.manufacturer, [Validators.required]],
      selfLife: [this.medicineInstance.selfLife, [Validators.required]],
      amount: [this.medicineInstance.amount, [Validators.required]]
    });
  }

  submit() {
    console.log(this.addForm.value);
    this.medicineKitService.addMedicineInstance(this.addForm.value)
      .subscribe((userData) => {
        console.log(userData);
      }, (error => {
        console.log(error);
      }));
  }

  get name() {
    return this.addForm.get('name');
  }

  get manufacturer() {
    return this.addForm.get('manufacturer');
  }

  get selfLife() {
    return this.addForm.get('selfLife');
  }

  get amount() {
    return this.addForm.get('amount');
  }
}
