import {createReducer, on} from '@ngrx/store';
import {addAccount, loadAccounts, loadAccountsFailure, loadAccountsSuccess, removeAccount,} from './account.actions';
import {Account} from "@app/_models";

export type AccountStatus = 'pending' | 'loading' | 'error' | 'success';

export interface AccountState {
  Accounts: Account;
  error: string | null;
  status: AccountStatus;
}

export const initialState: AccountState = {
  Accounts: {},
  error: null,
  status: 'pending',
};

export const AccountReducer = createReducer(
  // Supply the initial state
  initialState,
  // Add the new Account to the Accounts array
  on(addAccount, (state, {content}) => ({
    ...state,
    Accounts: {id: Date.now().toString(), content: content},
  })),
  // Remove the Account from the Accounts array
  on(removeAccount, (state, {id}) => ({
    ...state,
    Accounts: state.Accounts.id != null ? {} : {}
    ,
  })),
  // Trigger loading the Accounts
  on(loadAccounts, (state) => ({...state, status: 'loading' as AccountStatus})),
  // Handle successfully loaded Accounts
  on(loadAccountsSuccess, (state, {Accounts}) => ({
    ...state,
    Accounts: Accounts,
    error: null,
    status: 'success' as AccountStatus,
  })),
  // Handle Accounts load failure
  on(loadAccountsFailure, (state, {error}) => ({
    ...state,
    error: error,
    status: 'error' as AccountStatus,
  }))
);
