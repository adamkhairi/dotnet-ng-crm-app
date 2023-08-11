import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addAccount,
  removeAccount,
  loadAccounts,
  loadAccountsSuccess,
  loadAccountsFailure,
} from './account.actions';
import { of, from } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import {AccountService} from "@app/_services";
import {selectAccounts, selectAllAccounts} from "@app/state/account/account.selectors";
import {RegisterRequest} from "@app/_helpers/crm-api-client";

@Injectable()
export class AccountEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private AccountService: AccountService
  ) {}

  // Run this code when a loadAccounts action is dispatched
  loadAccounts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAccounts),
      switchMap(() =>
        // Call the getAccounts method, convert it to an observable
        from(this.store.select(selectAccounts)).pipe(
          // Take the returned value and return a new success action containing the Accounts
          map((Accounts) => loadAccountsSuccess({ Accounts: Accounts.Accounts })),
          // Or... if it errors return a new failure action containing the error
          catchError((error) => of(loadAccountsFailure({ error })))
        )
      )
    )
  );

  // Run this code when the addAccount or removeAccount action is dispatched
  saveAccounts$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addAccount, removeAccount),
        withLatestFrom(this.store.select(selectAllAccounts)),
        switchMap(([action, Accounts]) => from(this.AccountService.register(<RegisterRequest>Accounts)))
      ),
    // Most effects dispatch another action, but this one is just a "fire and forget" effect
    { dispatch: false }
  );
}
