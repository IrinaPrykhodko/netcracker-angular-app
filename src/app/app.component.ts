import {Component, OnInit} from '@angular/core';
import {SpinnerService} from './services/spinner.service';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'netcracker-angular-app';

  public isLoading;

  constructor(private spinnerService: SpinnerService) {
  }

  ngOnInit(): void {
    this.overrideDateToJson();
    this.spinnerService.isLoading$
      .subscribe(value => setTimeout(() => this.isLoading = value, 0));
  }

  overrideDateToJson() {
    Date.prototype.toJSON = function() {
      const dateAsString = moment(this).format();
      return dateAsString.slice(0, dateAsString.length - 6);
    };
  }
}
