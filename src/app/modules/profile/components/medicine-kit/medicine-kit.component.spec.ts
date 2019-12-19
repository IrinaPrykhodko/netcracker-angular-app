import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineKitComponent } from './medicine-kit.component';

describe('MedicineKitComponent', () => {
  let component: MedicineKitComponent;
  let fixture: ComponentFixture<MedicineKitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicineKitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicineKitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
