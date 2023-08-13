import { createAction, props } from '@ngrx/store';
import {Account} from "@app/_models";

export const addAccount = createAction(
  '[Account Page] Add Account',
  props<{ content: Account }>()
);

export const removeAccount = createAction(
  '[Account Page] Remove Account',
  props<{ id: string }>()
);

export const loadAccounts = createAction(
  '[Account Page] Load Accounts'
);

export const loadAccountsSuccess = createAction(
  '[Account API] Account Load Success',
  props<{ Accounts: Account[] }>()
);

export const loadAccountsFailure = createAction(
  '[Account API] Account Load Failure',
  props<{ error: string }>()
);
