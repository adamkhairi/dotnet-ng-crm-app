import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';

import {AccountService} from '@app/_services';
import {Store} from "@ngrx/store";
import {Account} from "@app/_models";
import {loadAccounts} from "@app/state/account/account.actions";

import * as AccountActions from "@app/state/account/account.actions";
import {
  selectAccountError,
  selectAccounts,
  selectAccountsLoading,
  selectAccountStatus
} from "@app/state/account/account.selectors";
import {Observable} from "rxjs";

@Component({templateUrl: 'list.component.html'})
export class ListComponent implements OnInit {
  // public allTodos$ = this.store.select(selectAllAccounts);
  // public loading: boolean | undefined;
  // public error: any;

  accounts$: Observable<any[]> | undefined;
  status$: Observable<string> | undefined;
  error$: Observable<any> | undefined;

  constructor(private accountService: AccountService, private store: Store) {
  }

  ngOnInit() {
    debugger
    this.store.dispatch(loadAccounts());
    // this.store.select(selectAccounts).subscribe((accounts: Account[]) => {
    //   this.accounts = accounts;
    // });
    // this.store.select(selectAccountsLoading).subscribe(loading => {
    //   this.loading = loading;
    // });
    // this.store.select(selectAccountError).subscribe(error => {
    //   this.error = error;
    // });

    this.accounts$ = this.store.select(selectAccounts);
    this.status$ = this.store.select(selectAccountStatus);
    this.error$ = this.store.select(selectAccountError);

    //   this.allTodos$.subscribe((data) => {
    //       this.accounts?.push(data) ;
    //   });
    // this.store.dispatch(loadAccounts());
    // this.accountService.getAll()
    // .pipe(first())
    // .subscribe(accounts => this.accounts = accounts);
  }
  // Methods to add, update, and delete accounts



  deleteAccount(id: string) {
    this.store.dispatch(AccountActions.deleteAccount({ id }));
  }

  // deleteAccount(id: string) {
  //   const account = this.accounts!.find(x => x.id === id);
  //   account.isDeleting = true;
  //   this.accountService.delete(id)
  //   .pipe(first())
  //   .subscribe(() => {
  //     this.accounts = this.accounts!.filter(x => x.id !== id)
  //   });
  // }
}
