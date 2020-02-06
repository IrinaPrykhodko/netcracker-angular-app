import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderDeleteComponent } from './reminder-delete.component';

describe('ReminderDeleteComponent', () => {
  let component: ReminderDeleteComponent;
  let fixture: ComponentFixture<ReminderDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReminderDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
