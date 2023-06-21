import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {AlertService} from '@app/_services';
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'alert', templateUrl: 'alert.component.html',
  standalone: true,
  imports: [
    NgClass,
    NgIf
  ]
})
export class AlertComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  alert: any;

  constructor(private alertService: AlertService) {
  }

  ngOnInit() {
    this.subscription = this.alertService.onAlert()
    .subscribe(alert => {
      switch (alert?.type) {
        case 'success':
          alert.cssClass = 'alert alert-success';
          break;
        case 'error':
          alert.cssClass = 'alert alert-danger';
          break;
      }

      this.alert = alert;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}