import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Notification} from '../models/notification';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {NotificationRequestItem} from '../models/dto/notification-request-item';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationList = new BehaviorSubject([]);
  public notificationList$ = this.notificationList.asObservable();

  private reminderList = new BehaviorSubject([]);
  public reminderList$ = this.reminderList.asObservable();

  private reminderAndNotificationCount = new BehaviorSubject(0);
  public reminderAndNotificationCount$ = this.reminderAndNotificationCount.asObservable();

  constructor(private http: HttpClient) { }

  getNotifications(page: number, size: number): Observable<Notification[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Notification[]>(`${environment.apiUrl}/notification`, {params})
      .pipe(map(notificationList => {
        this.notificationList.next(notificationList);
        return notificationList;
      }));
  }

  getReminders(page: number, size: number): Observable<Notification[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Notification[]>(`${environment.apiUrl}/reminder`, {params})
      .pipe(map(reminderList => {
        this.reminderList.next(reminderList);
        return reminderList;
      }));
  }

  setCounter(count: number) {
    this.reminderAndNotificationCount.next(count);
  }

  reminderAutoDecrement(reminder: Notification) {
    console.log(reminder);
    console.log(reminder.prescriptionItemId);
    const request: NotificationRequestItem = {
      id: reminder.id,
      userId: reminder.userId,
      type: reminder.type,
      remindTime: reminder.remindTime,
      medicineInstanceId: null,
      prescriptionItemId: reminder.prescriptionItemId,
      message: reminder.message,
    };

    console.log(request);

    return this.http.put(`${environment.apiUrl}/reminder`, request);
  }

  deleteNotification(notificationId: number) {
    console.log(notificationId);
    return this.http.delete(`${environment.apiUrl}/reminder/${notificationId}`);
  }

}
