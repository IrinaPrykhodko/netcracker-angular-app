import { Component, OnInit } from '@angular/core';
import {MedicineInstance} from '../../../../models/medicineInstance';
import {MedicineKitService} from '../../../../services/medicine-kit.service';

@Component({
  selector: 'app-medicine-kit',
  templateUrl: './medicine-kit.component.html',
  styleUrls: ['./medicine-kit.component.scss']
})
export class MedicineKitComponent implements OnInit {

  panelOpenState = false;
  medicineKit: MedicineInstance[];
  selectedMedicineInstance: MedicineInstance;
  paginationOptions = {
    pageNumber: 1,
    size: 8
  };
  searchText: string;

  constructor(private medicineKitService: MedicineKitService) { }

  ngOnInit() {
    this.medicineKitService.getMedicineInstances(this.paginationOptions.pageNumber, this.paginationOptions.size)
      .subscribe((data: MedicineInstance[]) => this.medicineKit = data);
  }

  onSelected(medicineInstance: MedicineInstance): void {
    this.selectedMedicineInstance = medicineInstance;
  }

  pageChange(p: number) {
    this.paginationOptions.pageNumber = p;
    console.log(this.paginationOptions.pageNumber);
    this.medicineKitService.getMedicineInstances(this.paginationOptions.pageNumber, this.paginationOptions.size)
      .subscribe((data: MedicineInstance[]) => this.medicineKit = data);
  }

  onSearch() {
    console.log(this.searchText);
  }

}
