import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as AccountsActions from './account.actions';
import {mergeMap, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {AccountService, AlertService} from "@app/_services";
import * as AccountActions from './account.actions';
import {ActivatedRoute} from "@angular/router";

@Injectable()
export class AccountEffects {
  constructor(
    private actions$: Actions,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private accountService: AccountService
  ) {
  }

  // Run this code when a loadAccounts action is dispatched
  loadAccounts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountsActions.loadAccounts),
      mergeMap(() =>
        this.accountService.getAll().pipe(
          map(accounts => AccountsActions.loadAccountsSuccess({accounts})),
          catchError(error => of(AccountsActions.loadAccountsFailure({error})))
        )
      )
      // switchMap(() =>
      //   // Call the getAccounts method, convert it to an observable
      //   from(this.accountService.getAll()).pipe(
      //     // Take the returned value and return a new success action containing the Accounts
      //     map((accounts) => loadAccountsSuccess({Accounts: accounts.map((i)=> <Account>i)})),
      //     // Or... if it errors return a new failure action containing the error
      //     catchError((error) => of(loadAccountsFailure({ error })))
      //   )
      // )
    )
  );

  // Run this code when the addAccount or removeAccount action is dispatched
  // saveAccounts$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(addAccount, removeAccount),
  //       withLatestFrom(this.store.select(selectAllAccounts)),
  //       // switchMap(([action, Accounts]) => from(this.AccountService.register(<RegisterRequest>Accounts)))
  //     ),
  //   // Most effects dispatch another action, but this one is just a "fire and forget" effect
  //   { dispatch: false }
  // );

  addAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountActions.addAccount),
      mergeMap((action) =>
        this.accountService.create(action.account).pipe(
          map((account) => AccountActions.addAccountSuccess({ account })),
          catchError((error) =>
            of(AccountActions.addAccountFailure({ error: error.message }))
          )
        )
      )
    )
  );

  updateAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountActions.updateAccount),
      mergeMap((action) =>
        this.accountService.update(action.id,action.account).pipe(
          map((account) => AccountActions.updateAccountSuccess({ account })),
          catchError((error) => {
              this.alertService.error(error);
             return  of(AccountActions.updateAccountFailure({error: error.message}))
            }
          )
        )
      )
    )
  );

  deleteAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountActions.deleteAccount),
      mergeMap((action) =>
        this.accountService.delete(action.id).pipe(
          map(() => AccountActions.deleteAccountSuccess({ id: action.id })),
          catchError((error) =>
            of(AccountActions.deleteAccountFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
