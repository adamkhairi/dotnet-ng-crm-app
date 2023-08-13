import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';

import {AccountService} from '@app/_services';
import {Store} from "@ngrx/store";
import {loadAccounts} from "@app/state/account/account.actions";
import {selectAccounts, selectAllAccounts} from "@app/state/account/account.selectors";
import {Account} from "@app/_models";
import {AccountState} from "@app/state/account/account.reducer";

@Component({templateUrl: 'list.component.html'})
export class ListComponent implements OnInit {
  accounts?: any[];
  public allTodos$ = this.store.select((state ) => state);

  constructor(private accountService: AccountService,private store: Store<Account>) {
  }

  ngOnInit() {
    debugger
    // this.store.dispatch(loadAccounts());
    //   this.allTodos$.subscribe((data) => {
    //       this.accounts?.push(data) ;
    //   });
      // this.store.dispatch(loadAccounts());
    this.accountService.getAll()
    .pipe(first())
    .subscribe(accounts => this.accounts = accounts);
  }

  deleteAccount(id: string) {
    const account = this.accounts!.find(x => x.id === id);
    account.isDeleting = true;
    this.accountService.delete(id)
    .pipe(first())
    .subscribe(() => {
      this.accounts = this.accounts!.filter(x => x.id !== id)
    });
  }
}
