import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationDeleteDialogComponent } from './notification-delete-dialog.component';

describe('NotificatonDeleteDialogComponent', () => {
  let component: NotificationDeleteDialogComponent;
  let fixture: ComponentFixture<NotificationDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
