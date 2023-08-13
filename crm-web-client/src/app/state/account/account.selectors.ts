import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { AccountState } from './account.reducer';

export const selectAccounts = (state: AppState) => state.accounts;

export const selectAllAccounts = createSelector(
  selectAccounts,
  (state: AccountState) => state.Accounts
);
