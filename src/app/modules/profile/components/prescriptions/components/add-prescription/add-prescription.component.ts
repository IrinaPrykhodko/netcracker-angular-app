import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AddPrescriptionData} from '../../../../../../models/AddPrescriptionData';


@Component({
  selector: 'app-add-prescription',
  templateUrl: './add-prescription.component.html',
  styleUrls: ['./add-prescription.component.scss']
})
export class AddPrescriptionComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AddPrescriptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddPrescriptionData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }


  ngOnInit() {
  }

}
