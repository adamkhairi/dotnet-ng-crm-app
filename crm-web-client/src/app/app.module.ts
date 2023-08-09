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
import {StoreModule} from "@ngrx/store";
import {AccountReducer} from "@app/state/account/account.reducer";
import {environment} from "@environments/environment";
import { IonicStorageModule } from '@ionic/storage-angular';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    StoreModule.forRoot({ accounts: AccountReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent
  ],
  providers: [
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
