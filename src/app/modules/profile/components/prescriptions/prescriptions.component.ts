import {Component, OnInit} from '@angular/core';
import {Prescription} from '../../../../models/prescription';
import {PrescriptionService} from '../../../../services/prescription.service';
import {PrescriptionItem} from '../../../../models/prescriptionItem';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {finalize} from 'rxjs/operators';
import {AddPrescriptionComponent} from './components/add-prescription/add-prescription.component';

@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.component.html',
  styleUrls: ['./prescriptions.component.scss']
})
export class PrescriptionsComponent implements OnInit {

  selectedPrescription: Prescription;
  public isLoading;
  public dialogRef: MatDialogRef<AddPrescriptionComponent>;

  prescriptionStruct: {
    prescription: Prescription,
    prescriptionItems: PrescriptionItem[];
  }[] = [];

  paginationOptions = {
    pageNumber: 0,
    size: 20
  };

  constructor(private prescriptionsService: PrescriptionService,
              private dialog: MatDialog) {
  }

  addPrescription(): void {
    this.dialogRef = this.dialog.open(AddPrescriptionComponent);
    this.dialogRef.afterClosed().subscribe(value => {
      if (value) {
        this.prescriptionStruct.push({prescription: value, prescriptionItems: null});
      }
    });
  }

  ngOnInit() {
    this.getPrescriptions();
  }

  onDelete(prescription: Prescription): void {
    this.prescriptionsService.deletePrescription(prescription);
  }


  changePage(p: number) {
    this.paginationOptions.pageNumber = p - 1;
    this.getPrescriptions();
  }

  getPrescriptionItems(id: number) {
    const index = this.prescriptionStruct.findIndex(value => value.prescription.id === id);

    if (!this.prescriptionStruct[index].prescriptionItems) {
      this.isLoading = true;

      this.prescriptionsService.getPrescriptionItems(id)
        .pipe(finalize(() => this.isLoading = false))
        .subscribe((data: PrescriptionItem[]) => {
          this.prescriptionStruct[index].prescriptionItems = data;
        });
    }
  }

  getPrescriptions() {
    this.isLoading = true;

    this.prescriptionsService.getPrescriptions(this.paginationOptions.pageNumber, this.paginationOptions.size)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe((data: Prescription[]) => {
        data.forEach(value => {
          this.prescriptionStruct.push({prescription: value, prescriptionItems: null});
        });
      });
  }
}
