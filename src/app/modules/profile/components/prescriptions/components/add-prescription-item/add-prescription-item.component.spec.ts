import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPrescriptionItemComponent } from './add-prescription-item.component';

describe('AddPrescriptionItemComponent', () => {
  let component: AddPrescriptionItemComponent;
  let fixture: ComponentFixture<AddPrescriptionItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPrescriptionItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPrescriptionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
