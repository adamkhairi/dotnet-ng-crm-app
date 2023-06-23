import {Injectable} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {filter, Observable, Subject} from 'rxjs';
import {Alert, AlertOptions, AlertType} from "@app/_models/alert";

@Injectable({providedIn: 'root'})
export class AlertService {

  private subject = new Subject<Alert>();
  private defaultId = 'default-alert';

  // enable subscribing to alerts observable
  onAlert(id = this.defaultId): Observable<Alert> {
    return this.subject.asObservable().pipe(filter(x => x && x.id === id));
  }

  // convenience methods
  success(message: string, options?: AlertOptions) {
    this.alert(new Alert({ ...options, type: AlertType.Success, message }));
  }

  error(message: string, options?: AlertOptions) {
    this.alert(new Alert({ ...options, type: AlertType.Error, message }));
  }

  info(message: string, options?: AlertOptions) {
    this.alert(new Alert({ ...options, type: AlertType.Info, message }));
  }

  warn(message: string, options?: AlertOptions) {
    this.alert(new Alert({ ...options, type: AlertType.Warning, message }));
  }

  // core alert method
  alert(alert: Alert) {
    alert.id = alert.id || this.defaultId;
    alert.autoClose = (alert.autoClose === undefined ? true : alert.autoClose);
    this.subject.next(alert);
  }

  // clear alerts
  clear(id = this.defaultId) {
    this.subject.next(new Alert({ id }));
  }

  private showAfterRedirect = false;

  constructor(private router: Router) {
    // clear alert messages on route change unless 'showAfterRedirect' flag is true
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.showAfterRedirect) {
          // only keep for a single route change
          this.showAfterRedirect = false;
        } else {
          // clear alert message
          this.clear();
        }
      }
    });
  }

}