import {Component, OnDestroy, OnInit} from '@angular/core';
import {Prescription} from '../../../../models/prescription';
import {PrescriptionService} from '../../../../services/prescription.service';
import {PrescriptionItem} from '../../../../models/prescriptionItem';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {finalize, takeUntil} from 'rxjs/operators';
import {AddPrescriptionComponent} from './components/add-prescription/add-prescription.component';
import {AddPrescriptionItemComponent} from './components/add-prescription-item/add-prescription-item.component';
import {SpinnerService} from '../../../../services/spinner.service';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';
import * as moment from 'moment';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.component.html',
  styleUrls: ['./prescriptions.component.scss']
})
export class PrescriptionsComponent implements OnInit, OnDestroy {

  public addPrescriptionDialogRef: MatDialogRef<AddPrescriptionComponent>;
  public addItemDialogRed: MatDialogRef<AddPrescriptionItemComponent>;
  destroy$: Subject<boolean> = new Subject<boolean>();

  prescriptionStruct: {
    prescription: Prescription,
    prescriptionItems: PrescriptionItem[];
  }[] = [];

  paginationOptions = {
    pageNumber: 0,
    size: 10
  };

  constructor(private prescriptionsService: PrescriptionService,
              private dialog: MatDialog,
              private spinnerService: SpinnerService) {
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

    this.addItemDialogRed.afterClosed()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(value => {
        if (value) {
          const index = this.prescriptionStruct.findIndex(elem => elem.prescription.id === prescription.id);

          if (isNotNullOrUndefined(index)) {
            this.prescriptionStruct[index].prescriptionItems.push(value);
          }
        }
      });
  }

  deletePrescription(id: number) {
    this.spinnerService.setIsLoading(true);

    this.prescriptionsService.deletePrescription(id)
      .pipe(
        finalize(() => this.spinnerService.setIsLoading(false)),
        takeUntil(this.destroy$)
      )
      .subscribe(value => {
        const index = this.prescriptionStruct.findIndex(elem => elem.prescription.id === id);

        if (isNotNullOrUndefined(index)) {
          this.prescriptionStruct.splice(index, 1);
        }
      });
  }

  changePage(p: number) {
    this.paginationOptions.pageNumber = p - 1;
    const requiredNumberOfPrescriptions = this.paginationOptions.pageNumber * this.paginationOptions.size;

    if (requiredNumberOfPrescriptions >= this.prescriptionStruct.length - 1) {
      this.prescriptionStruct.pop();
      this.getPrescriptions();
    }
  }

  getPrescriptionItems(id: number) {
    const index = this.prescriptionStruct.findIndex(value => value.prescription.id === id);

    if (!this.prescriptionStruct[index].prescriptionItems) {
      this.spinnerService.setIsLoading(true);

      this.prescriptionsService.getPrescriptionItems(id)
        .pipe(
          finalize(() => this.spinnerService.setIsLoading(false)),
          takeUntil(this.destroy$)
        )
        .subscribe((data: PrescriptionItem[]) => {
          this.prescriptionStruct[index].prescriptionItems = data;
        });
    }
  }

  getPrescriptions() {
    this.spinnerService.setIsLoading(true);

    this.prescriptionsService.getPrescriptions(this.paginationOptions.pageNumber, this.paginationOptions.size)
      .pipe(
        finalize(() => this.spinnerService.setIsLoading(false)),
        takeUntil(this.destroy$)
      )
      .subscribe((data: Prescription[]) => {
        data.forEach(value => {
          this.prescriptionStruct.push({prescription: value, prescriptionItems: null});
        });
      });
  }

  deletePrescriptionItem(prescriptionId: number, prescriptionItemId: number) {
    this.spinnerService.setIsLoading(true);

    this.prescriptionsService.deletePrescriptionItem(prescriptionItemId)
      .pipe(
        finalize(() => this.spinnerService.setIsLoading(false)),
        takeUntil(this.destroy$)
      )
      .subscribe(value => {
        const prescriptionIndex = this.prescriptionStruct.findIndex(elem => {
          return elem.prescription.id === prescriptionId;
        });

        if (isNotNullOrUndefined(prescriptionIndex)) {
          const prescriptionItemIndex = this.prescriptionStruct[prescriptionIndex].prescriptionItems.findIndex(elem => {
            return elem.id === prescriptionItemId;
          });

          if (isNotNullOrUndefined(prescriptionItemIndex)) {
            this.prescriptionStruct[prescriptionIndex].prescriptionItems.splice(prescriptionItemIndex, 1);
          }
        }
      });
  }

  isPrescriptionItemEndDateInPast(prescriptionItem: PrescriptionItem) {
    const prescriptionItemEndDate = moment(prescriptionItem.endDate).startOf('day');
    const todayDate = moment().startOf('day');

    return prescriptionItemEndDate.isBefore(todayDate);
  }

  setIsReminderEnabled(prescriptionItemId: number, isReminderEnabled: boolean) {
    this.spinnerService.setIsLoading(true);

    this.prescriptionsService.setIsReminderEnabled(prescriptionItemId, isReminderEnabled)
      .pipe(finalize(() => this.spinnerService.setIsLoading(false)))
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
