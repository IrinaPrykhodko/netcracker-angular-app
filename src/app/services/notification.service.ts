import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Notification} from '../models/notification';
import {map} from 'rxjs/operators';

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

    return this.http.get<Notification[]>(`assets/notification.json`, {params})
      .pipe(map(notificationList => {
        this.notificationList.next(notificationList);
        return notificationList;
      }));
  }

  getReminders(page: number, size: number): Observable<Notification[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Notification[]>(`assets/reminder.json`, {params})
      .pipe(map(reminderList => {
        this.reminderList.next(reminderList);
        return reminderList;
      }));
  }

  setCounter(count: number) {
    this.reminderAndNotificationCount.next(count);
  }

}
