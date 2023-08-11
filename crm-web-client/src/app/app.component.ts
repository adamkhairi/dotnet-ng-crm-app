import {Component, Inject} from '@angular/core';
import {Role, User} from "./_models";
import {AccountService} from "./_services";
import {Account} from "@app/_models/account";
import {API_BASE_URL, AuthenticateResponse} from "@app/_helpers/crm-api-client";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  Role = Role;
  account?: AuthenticateResponse | null;
  title = 'crm-web-client';

  constructor(@Inject(API_BASE_URL) public baseUrl: String,private accountService: AccountService) {
    this.accountService.account.subscribe(x => this.account = x);
  }

  logout() {
    this.accountService.logout();
  }
}
