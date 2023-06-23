import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { LayoutComponent } from './layout.component';
import {ResetPasswordComponent} from "@app/account/reset-password.component";
import {LoginComponent} from "@app/account/login.component";
import {RegisterComponent} from "@app/account/register.component";
import {VerifyEmailComponent} from "@app/account/verify-email.component";
import {ForgotPasswordComponent} from "@app/account/forgot-password.component";



@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AccountRoutingModule
    ],
    declarations: [
        LayoutComponent,
        LoginComponent,
        RegisterComponent,
        VerifyEmailComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent
    ]
})
export class AccountModule { }