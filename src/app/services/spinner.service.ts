import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private isLoading = new BehaviorSubject(false);
  public isLoading$ = this.isLoading.asObservable();

  constructor() {
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading.next(isLoading);
  }
}
