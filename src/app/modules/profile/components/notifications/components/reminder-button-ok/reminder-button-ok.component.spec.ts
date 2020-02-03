import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderButtonOkComponent } from './reminder-button-ok.component';

describe('ReminderButtonOkComponent', () => {
  let component: ReminderButtonOkComponent;
  let fixture: ComponentFixture<ReminderButtonOkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReminderButtonOkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderButtonOkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
