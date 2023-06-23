import {Component} from '@angular/core';
import {Role, User} from "./_models";
import {AccountService} from "./_services";
import {Account} from "@app/_models/account";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  Role = Role;
  account?: Account | null;
  title = 'crm-web-client';

  constructor(private accountService: AccountService) {
    this.accountService.account.subscribe(x => this.account = x);
  }

  logout() {
    this.accountService.logout();
  }
}
