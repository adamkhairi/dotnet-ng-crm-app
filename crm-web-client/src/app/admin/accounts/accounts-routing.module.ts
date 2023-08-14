import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ListComponent} from '@app/admin';
import {AddEditComponent} from '@app/admin';

const routes: Routes = [
  {path: '', component: ListComponent},
  {path: 'add', component: AddEditComponent},
  {path: 'edit/:id', component: AddEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule {
}
