import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SpinnerService} from '../../../../services/spinner.service';
import {finalize} from 'rxjs/operators';
import {MedicineService} from '../../../../services/medicine.service';
import {PurchaseService} from '../../../../services/purchase.service';
import {Medicine} from '../../../../models/medicine';
import {ToastrService} from 'ngx-toastr';
import {CustomValidations} from '../../../../helpers/CustomValidations';

@Component({
  selector: 'app-add-medicine-to-purchases',
  templateUrl: './add-medicine-to-purchases.component.html',
  styleUrls: ['./add-medicine-to-purchases.component.scss']
})
export class AddMedicineToPurchasesComponent implements OnInit {

  public medicineInstanceId: number;
  public addForm: FormGroup;
  public medicine: Medicine;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { medicineInstanceId: number },
              private dialogRef: MatDialogRef<AddMedicineToPurchasesComponent>,
              private formBuilder: FormBuilder,
              private spinnerService: SpinnerService,
              private medicineService: MedicineService,
              private purchaseService: PurchaseService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.medicineInstanceId = this.data.medicineInstanceId;

    this.addForm = this.formBuilder.group({
      amount: ['', [Validators.required, Validators.min(0), CustomValidations.digitsOnly]]
    });
  }

  get amount() {
    return this.addForm.get('amount');
  }

  addMedicineToPurchasesByMedicineInstanceId(medicineInstanceId: number, amount: number): void {

    console.log('medicine instance id = ' + medicineInstanceId + ' amount = ' + amount);
    this.spinnerService.setIsLoading(true);

    this.purchaseService.addPurchaseItemWithMedicineInstanceId(medicineInstanceId, amount)
      .pipe(finalize(() => this.spinnerService.setIsLoading(false)))
      .subscribe(() => {
        this.toastr.success('Purchase item created', 'Success');
        this.dialogRef.close(true);
      }, error => {
        this.toastr.error('Please, try again later or contact with administrator', 'Error');
        this.dialogRef.close(false);
      });
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

}
