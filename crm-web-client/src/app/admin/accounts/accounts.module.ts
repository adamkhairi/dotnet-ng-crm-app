import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {AccountsRoutingModule} from './accounts-routing.module';
import {ListComponent} from '@app/admin';
import {AddEditComponent} from '@app/admin';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AccountsRoutingModule
  ],
  declarations: [
    ListComponent,
    AddEditComponent
  ]
})
export class AccountsModule {
}
