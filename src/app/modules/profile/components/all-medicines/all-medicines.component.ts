import {Component, OnInit} from '@angular/core';
import {Medicine} from '../../../../models/medicine';
import {AllMedicinesService} from '../../../../services/all-medicines.service';

@Component({
  selector: 'app-all-medicines',
  templateUrl: './all-medicines.component.html',
  styleUrls: ['./all-medicines.component.scss']
})
export class AllMedicinesComponent implements OnInit {

  medicineList: Medicine[];
  selectedMedicine: Medicine;
  paginationOptions = {
    pageNumber: 0,
    size: 8
  };
  searchText: string;

  constructor(private medicinesService: AllMedicinesService) {
  }

  ngOnInit() {
    this.getMedicines();
  }

  onSelected(medicine: Medicine): void {
    this.selectedMedicine = medicine;
  }

  pageChange(p: number) {
    this.paginationOptions.pageNumber = p;
    console.log(this.paginationOptions.pageNumber);
    this.getMedicines();
  }

  onSearch() {
    this.getMedicines(this.searchText);
  }


  private getMedicines(searchText?: string) {
    this.medicinesService.getMedicines(this.paginationOptions.pageNumber, this.paginationOptions.size, searchText)
      .subscribe((data: Medicine[]) => this.medicineList = data);
  }
}
