import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home";
import {AuthGuard} from "./_helpers";
import {LoginComponent, RegisterComponent} from "./account";

const usersRoutes = () => import('./users/users.routes').then(x => x.USERS_ROUTES);

export const APP_ROUTES: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'users', loadChildren: usersRoutes, canActivate: [AuthGuard] },
  { path: 'account/login', component: LoginComponent },
  { path: 'account/register', component: RegisterComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
