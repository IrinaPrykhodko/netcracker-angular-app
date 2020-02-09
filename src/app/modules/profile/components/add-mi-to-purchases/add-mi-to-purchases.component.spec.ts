import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMiToPurchasesComponent } from './add-mi-to-purchases.component';

describe('AddMiToPurchasesComponent', () => {
  let component: AddMiToPurchasesComponent;
  let fixture: ComponentFixture<AddMiToPurchasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMiToPurchasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMiToPurchasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
