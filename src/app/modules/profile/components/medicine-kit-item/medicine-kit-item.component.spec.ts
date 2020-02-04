import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineKitItemComponent } from './medicine-kit-item.component';

describe('MedicineKitItemComponent', () => {
  let component: MedicineKitItemComponent;
  let fixture: ComponentFixture<MedicineKitItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicineKitItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicineKitItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
