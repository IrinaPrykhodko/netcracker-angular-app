import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SpinnerService} from '../../../../services/spinner.service';
import {finalize} from 'rxjs/operators';
import {PurchaseService} from '../../../../services/purchase.service';
import {Medicine} from '../../../../models/medicine';
import {ToastrService} from 'ngx-toastr';
import {PurchaseItem} from '../../../../models/purchase-item';

@Component({
  selector: 'app-add-medicine-to-purchases',
  templateUrl: './add-medicine-to-purchases.component.html',
  styleUrls: ['./add-medicine-to-purchases.component.scss']
})
export class AddMedicineToPurchasesComponent implements OnInit {

  public addForm: FormGroup;
  public medicine: Medicine;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {medicine: Medicine},
              private dialogRef: MatDialogRef<AddMedicineToPurchasesComponent>,
              private formBuilder: FormBuilder,
              private spinnerService: SpinnerService,
              private purchaseService: PurchaseService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.medicine = this.data.medicine;

    this.addForm = this.formBuilder.group({
      amount: ['', [Validators.required]]
    });
  }

  get amount() {
    return this.addForm.get('amount');
  }

  addMedicineToPurchase(medicine: Medicine, amount: number) {
    this.spinnerService.setIsLoading(true);

    const purchaseItem: PurchaseItem = {
      amount,
      medicine
    };

    this.purchaseService.addPurchaseItem(purchaseItem)
      .pipe(finalize(() => this.spinnerService.setIsLoading(false)))
      .subscribe(value => {
        console.log(value);
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
