import {Component, OnInit} from '@angular/core';
import {Prescription} from '../../../../models/prescription';
import {PrescriptionService} from '../../../../services/prescription.service';
import {PrescriptionItem} from '../../../../models/prescriptionItem';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {finalize} from 'rxjs/operators';
import {AddPrescriptionComponent} from './components/add-prescription/add-prescription.component';
import {AddPrescriptionItemComponent} from './components/add-prescription-item/add-prescription-item.component';

@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.component.html',
  styleUrls: ['./prescriptions.component.scss']
})
export class PrescriptionsComponent implements OnInit {

  selectedPrescription: Prescription;
  public isLoading;
  public addPrescriptionDialogRef: MatDialogRef<AddPrescriptionComponent>;
  public addItemDialogRed: MatDialogRef<AddPrescriptionItemComponent>;

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

  ngOnInit() {
    this.getPrescriptions();
  }

  addPrescription(): void {
    this.addPrescriptionDialogRef = this.dialog.open(AddPrescriptionComponent);

    this.addPrescriptionDialogRef.afterClosed().subscribe(value => {
      if (value) {
        this.prescriptionStruct.push({prescription: value, prescriptionItems: null});
      }
    });
  }

  addPrescriptionItem(prescription: Prescription) {
    this.addItemDialogRed = this.dialog.open(AddPrescriptionItemComponent, {
      data: {prescription}
    });
  }

  deletePrescription(id: number) {
    this.isLoading = true;

    this.prescriptionsService.deletePrescription(id)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(value => {
        const index = this.prescriptionStruct.findIndex(element => element.prescription.id === id);

        if (index) {
          this.prescriptionStruct.splice(index, 1);
        }
      });
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
