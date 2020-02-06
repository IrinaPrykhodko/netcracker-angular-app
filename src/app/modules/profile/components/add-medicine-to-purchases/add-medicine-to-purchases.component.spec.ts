import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMedicineToPurchasesComponent } from './add-medicine-to-purchases.component';

describe('AddMedicineToPurchasesComponent', () => {
  let component: AddMedicineToPurchasesComponent;
  let fixture: ComponentFixture<AddMedicineToPurchasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMedicineToPurchasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMedicineToPurchasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
