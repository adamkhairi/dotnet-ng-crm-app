import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AlertComponent} from "@app/_components";
import {appInitializer, ErrorInterceptor, JwtInterceptor} from "@app/_helpers";
import {ReactiveFormsModule} from "@angular/forms";
import {AccountService} from "@app/_services";
import {HomeComponent} from "@app/home";
import {environment} from "@environments/environment";
import {AccountsClient, API_BASE_URL} from "@app/_helpers/crm-api-client";
import {IonicModule} from "@ionic/angular";
import {IonicStorageModule} from "@ionic/storage-angular";
import {StoreModule} from "@ngrx/store";
import {AccountReducer} from "@app/state/account/account.reducer";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {EffectsModule} from "@ngrx/effects";
import {AccountEffects} from "@app/state/account/account.effects";
import { NavBarComponent } from './_components/nav-bar/nav-bar.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    StoreModule.forRoot({accounts: AccountReducer}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    connectInZone: true}),
    EffectsModule.forRoot([AccountEffects]),
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    NavBarComponent
  ],
  providers: [
    {
      provide: API_BASE_URL,
      useValue: environment.apiUrl
    },
    AccountsClient,
    {provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AccountService]},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},

    // provider used to create fake backend
    //  fakeBackendProvider
  ]
  ,
  bootstrap: [AppComponent]
})
export class AppModule {
}
