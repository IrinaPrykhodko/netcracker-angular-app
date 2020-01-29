import {Component, OnInit} from '@angular/core';
import {SpinnerService} from './services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'netcracker-angular-app';

  private isLoading;

  constructor(private spinnerService: SpinnerService) {
  }

  ngOnInit(): void {
    this.spinnerService.isLoading$
      .subscribe(value => setTimeout(() => this.isLoading = value, 0));
  }
}
