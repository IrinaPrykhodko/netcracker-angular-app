import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SpinnerService} from '../../../../services/spinner.service';
import {PurchaseService} from '../../../../services/purchase.service';
import {ToastrService} from 'ngx-toastr';
import {finalize} from 'rxjs/operators';
import {CustomValidations} from '../../../../helpers/CustomValidations';

@Component({
  selector: 'app-add-mi-to-purchases',
  templateUrl: './add-mi-to-purchases.component.html',
  styleUrls: ['./add-mi-to-purchases.component.scss']
})
export class AddMiToPurchasesComponent implements OnInit {

  public medicineInstanceId: number;
  public addForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {medicineInstanceId: number},
              private dialogRef: MatDialogRef<AddMiToPurchasesComponent>,
              private formBuilder: FormBuilder,
              private spinnerService: SpinnerService,
              private purchaseService: PurchaseService,
              private toastr: ToastrService) { }

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
        this.dialogRef.close(true);
        this.toastr.success('Purchase item created', 'Success');
      }, error => {
        this.dialogRef.close(false);
        this.toastr.error('Please, try again later or contact with administrator', 'Error');
      });
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

}
