import {Component} from '@angular/core';

import {User} from '@app/_models';
import {AccountService} from '@app/_services';

@Component({
  templateUrl: 'home.component.html',
})
export class HomeComponent {
  account = this.accountService.accountValue;

  constructor(private accountService: AccountService) { }
}