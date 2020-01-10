import { Component, OnInit } from '@angular/core';
import {Prescription} from '../../../../models/prescription';
import {PrescriptionsService} from '../../../../services/prescriptions.service';
import {PrescriptionItem} from '../../../../models/prescriptionItem';
import {User} from '../../../../models/user';
import {MatDialog} from '@angular/material/dialog';
import {AddPrescriptionComponent} from './components/add-prescription/add-prescription.component';
import {AddPrescriptionData} from '../../../../models/AddPrescriptionData';

@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.component.html',
  styleUrls: ['./prescriptions.component.scss']
})
export class PrescriptionsComponent implements OnInit {

  prescriptionsList: Prescription[];
  user = User;
  selectedPrescription: Prescription;
  prescriptionItemList: PrescriptionItem[];
  paginationOptions = {
    pageNumber: 1,
    size: 8
  };
  addPrescriptionData: AddPrescriptionData;



  constructor(private prescriptionsService: PrescriptionsService, public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddPrescriptionComponent, {
      width: '400px',
      // tslint:disable-next-line:max-line-length
      // data: { name: this.addPrescriptionData.name, medicineId: this.addPrescriptionData.medicineId, takingDurationDays: this.addPrescriptionData.takingDurationDays, takingTime: this.addPrescriptionData.takingTime, startDate: this.addPrescriptionData.startDate, endDate: this.addPrescriptionData.endDate }
    });

    dialogRef.afterClosed().subscribe(res => {
      this.addPrescriptionData.name = res.name;
      this.addPrescriptionData.medicineId = res.medicineId;
      this.addPrescriptionData.takingDurationDays = res.takingDurationDays;
      this.addPrescriptionData.takingTime = res.takingTime;
      this.addPrescriptionData.startDate = res.startDate;
      this.addPrescriptionData.endDate = res.endDate;
      this.prescriptionsService.postPrescription(this.addPrescriptionData);
    });
  }

  ngOnInit() {
    this.prescriptionsService.getPrescriptions(this.paginationOptions.pageNumber, this.paginationOptions.size)
      .subscribe((data: Prescription[]) => this.prescriptionsList = data);
  }

  onSelected(prescription: Prescription): void {
    this.selectedPrescription = prescription;
    // tslint:disable-next-line:max-line-length
    this.prescriptionsService.getPrescriptionItems(this.paginationOptions.pageNumber, this.paginationOptions.size, this.selectedPrescription.id)
      .subscribe((data: PrescriptionItem[]) => this.prescriptionItemList = data);
  }

  onDelete(prescription: Prescription): void {
    this.prescriptionsService.deletePrescription(prescription);
  }


  pageChange(p: number) {
    this.paginationOptions.pageNumber = p;
    console.log(this.paginationOptions.pageNumber);
    this.prescriptionsService.getPrescriptions(this.paginationOptions.pageNumber, this.paginationOptions.size)
      .subscribe((data: Prescription[]) => this.prescriptionsList = data);
  }

}
