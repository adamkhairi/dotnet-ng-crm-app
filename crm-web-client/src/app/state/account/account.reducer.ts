import {createReducer, on} from '@ngrx/store';
import * as AccountsActions from './account.actions';
import {Account} from "@app/_models";

export type AccountStatus = 'pending' | 'loading' | 'error' | 'success';

export interface AccountState {
  accounts: Account[];
  error: string | null;
  status: AccountStatus;
}

export const initialState: AccountState = {
  accounts: [],
  error: null,
  status: 'pending',
};

export const AccountReducer = createReducer(
  // Supply the initial state
  initialState,

  // Handle successful Actions
  // loading action
  on(AccountsActions.loadAccounts, (state) => ({...state, status: 'loading' as AccountStatus})),
  on(AccountsActions.loadAccountsSuccess, (state, {accounts}) => ({
    ...state,
    accounts,
    status: 'success' as AccountStatus,
  })),

  // Add action
  on(AccountsActions.addAccount, state => ({...state, status: 'loading' as AccountStatus})),
  on(AccountsActions.addAccountSuccess, (state, {account}) => ({
    ...state,
    accounts: [...state.accounts, account],
    status: 'success' as AccountStatus
  })),

  // Update action
  on(AccountsActions.updateAccount, state => ({...state, status: 'loading' as AccountStatus})),
  on(AccountsActions.updateAccountSuccess, (state, {account}) => ({
    ...state,
    accounts: state.accounts.map(account => account.id === account.id ? account : account),
    status: 'success' as AccountStatus
  })),

  // Delete action
  on(AccountsActions.deleteAccount, state => ({...state, status: 'loading' as AccountStatus})),
  on(AccountsActions.deleteAccountSuccess, (state, {id}) => ({
    ...state,
    accounts: state.accounts.filter(account => account.id !== id),
    status: 'success' as AccountStatus
  })),

  // Handle failure Actions
  on(
    AccountsActions.addAccountFailure,
    AccountsActions.updateAccountFailure,
    AccountsActions.deleteAccountFailure,
    (state, { error }) => ({
      ...state,
      error,
      status: 'error' as AccountStatus
    })
  )
);
