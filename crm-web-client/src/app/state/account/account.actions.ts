import {createAction, props} from '@ngrx/store';
import {Account} from "@app/_models";

export const loadAccounts = createAction('[Account] Load Accounts');
export const loadAccountsSuccess = createAction('[Account] Account Load Success', props<{ accounts: Account[] }>());
export const loadAccountsFailure = createAction('[Account] Account Load Failure', props<{ error: any }>());

//////////////

export const addAccount = createAction('[Accounts] Add Account', props<{ account: Account }>());
export const addAccountSuccess = createAction('[Accounts] Add Account Success', props<{ account: Account }>());
export const addAccountFailure = createAction('[Accounts] Add Account Failure', props<{ error: any }>());

export const updateAccount = createAction('[Accounts] Update Account', props<{ id: string, account: Account }>());
export const updateAccountSuccess = createAction('[Accounts] Update Account Success', props<{ account: Account }>());
export const updateAccountFailure = createAction('[Accounts] Update Account Failure', props<{ error: any }>());

export const deleteAccount = createAction('[Accounts] Delete Account', props<{ id: string }>());
export const deleteAccountSuccess = createAction('[Accounts] Delete Account Success', props<{ id: string }>());
export const deleteAccountFailure = createAction('[Accounts] Delete Account Failure', props<{ error: any }>());