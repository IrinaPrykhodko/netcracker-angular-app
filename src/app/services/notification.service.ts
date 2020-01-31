import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Notification} from '../models/notification';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationList = new BehaviorSubject(null);
  public notificationList$ = this.notificationList.asObservable();

  private reminderList = new BehaviorSubject(null);
  public reminderList$ = this.notificationList.asObservable();

  constructor(private http: HttpClient) { }

  getNotifications(): Observable<Notification[]> {

      return this.http.get<Notification[]>('assets/notification.json')
      .pipe(map(notificationList => {
        this.notificationList.next(notificationList);
        return notificationList;
      }));
  }

  getReminders(): Observable<Notification[]> {
    return this.http.get<Notification[]>('assets/reminder.json')
      .pipe(map(reminderList => {
        this.reminderList.next(reminderList);
        return reminderList;
      }));
  }

}
