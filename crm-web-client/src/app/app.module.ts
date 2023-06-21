import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AlertComponent} from "@app/_components";
import {appInitializer, ErrorInterceptor, fakeBackendProvider, JwtInterceptor} from "@app/_helpers";
import {ReactiveFormsModule} from "@angular/forms";
import {AccountService} from "@app/_services";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AlertComponent
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AccountService] },
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
