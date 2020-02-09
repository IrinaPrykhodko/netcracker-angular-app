import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MedicineInstance} from '../../../../../../models/medicineInstance';
import {MedicineKitService} from '../../../../../../services/medicine-kit.service';
import {Medicine} from '../../../../../../models/medicine';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SpinnerService} from '../../../../../../services/spinner.service';
import {finalize} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  public medicine: Medicine = new Medicine();
  public medicineInstance: MedicineInstance = new MedicineInstance();
  public addForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { medicine: Medicine },
              private formBuilder: FormBuilder,
              private medicineKitService: MedicineKitService,
              public dialogRef: MatDialogRef<AddComponent>,
              private spinnerService: SpinnerService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    console.log(this.medicineInstance);

    this.addForm = this.formBuilder.group({
      selfLife: [this.medicineInstance.selfLife, [Validators.required]],
      amount: [this.medicineInstance.amount, [Validators.required, Validators.min(0)]]
    });
    this.medicine = this.data.medicine;
  }


  submit() {
    this.spinnerService.setIsLoading(true);
    console.log(this.addForm.value);
    this.medicineInstance.amount = this.addForm.value.amount;
    this.medicineInstance.selfLife = this.addForm.value.selfLife;
    this.medicineInstance.medicine = this.medicine;
    this.medicineKitService.addMedicineInstance(this.medicineInstance)
      .pipe(finalize(() => this.spinnerService.setIsLoading(false)))
      .subscribe((userData) => {
        console.log(userData);
        this.dialogRef.close();
        this.toastr.success('Medicine added to medicine kit', 'Success');
      }, (error => {
        console.log(error);
        this.dialogRef.close();
        this.toastr.error('Please, try again later or contact with administrator', 'Error');
      }));
  }

  cancel() {
    this.dialogRef.close();
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
