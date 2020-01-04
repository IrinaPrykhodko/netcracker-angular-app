import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MedicineKitService} from "../../../../services/medicine-kit.service";
import {MedicineInstance} from "../../../../models/medicineInstance";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-medicine-kit',
  templateUrl: './medicine-kit.component.html',
  styleUrls: ['./medicine-kit.component.scss']
})
export class MedicineKitComponent implements OnInit {

  panelOpenState = false;
  medicineKit: MedicineInstance[];
  editForm: FormGroup;
  medicineInstance: MedicineInstance;
  selectedMedicineInstance: MedicineInstance;
  paginationOptions = {
    pageNumber: 0,
    size: 8
  };
  searchText: string;

  constructor(private medicineKitService: MedicineKitService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.medicineKitService.getMedicineInstances(this.paginationOptions.pageNumber, this.paginationOptions.size)
      .pipe(map((data: MedicineInstance[]) => {
        return data.map(item => this.checkDate(item))
      }))
      .subscribe((data: MedicineInstance[]) => this.medicineKit = data);
  }

  onSelected(medicineInstance: MedicineInstance): void {
    this.selectedMedicineInstance = medicineInstance;
    this.editForm = this.formBuilder.group({
      id: [this.selectedMedicineInstance.id],
      selfLife: [this.selectedMedicineInstance.selfLife, [Validators.required]],
      amount: [this.selectedMedicineInstance.amount, [Validators.required]]
    });
  }

  pageChange(p: number) {
    this.paginationOptions.pageNumber = p;
    console.log(this.paginationOptions.pageNumber);
    this.medicineKitService.getMedicineInstances(this.paginationOptions.pageNumber, this.paginationOptions.size)
      .pipe(map((data: MedicineInstance[]) => {
        return data.map(item => this.checkDate(item))
      }))
      .subscribe((data: MedicineInstance[]) => this.medicineKit = data);
  }
  checkDate(item: any){
    if(new Date(item.selfLife) < new Date()){
      return {
        ...item,
        isExpired:true
      }
    }else{
      return {
        ...item,
        isExpired:false
      }
    }
  }

  onSearch() {
    console.log(this.searchText);
  }

  submit() {
    console.log(this.editForm.value);
    this.medicineKitService.editMedicineInstances(this.editForm.value)
      .subscribe((userData) => {
        console.log(userData);
      }, (error => {
        console.log(error);
      }));
  }

  delete(id: number) {
    console.log();
    this.medicineKitService.deleteMedicineInstance(id)
      .subscribe((userData) => {
        console.log(userData);
      }, (error => {
        console.log(error);
      }));
  }

}
