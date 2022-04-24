import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Import the module from the SDK
import { AuthModule } from '@auth0/auth0-angular';
// Import the injector module and the HTTP client module from Angular
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// Import the HTTP interceptor from the Auth0 Angular SDK
import { AuthHttpInterceptor } from '@auth0/auth0-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BodyComponent } from './components/body/body.component';
import { MenuComponent } from './components/menu/menu.component';
import { LoginbuttonComponent } from './components/loginbutton/loginbutton.component';
import { LogoutbuttonComponent } from './components/logoutbutton/logoutbutton.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ExternalapiComponent } from './components/externalapi/externalapi.component';
import { MisEventosComponent } from './components/events/mis-eventos/mis-eventos.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    MenuComponent,
    LoginbuttonComponent,
    LogoutbuttonComponent,
    ProfileComponent,
    ExternalapiComponent,
    MisEventosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule.forRoot({
      // The domain and clientId were configured in the previous chapter
      domain: 'dev-dyft8jys.us.auth0.com',
      clientId: 'kuq2N6i9avOgbN2zFhloF7HAacDxxu96',

      // Request this audience at user authentication time
      audience: 'https://dev-dyft8jys.us.auth0.com/api/v2/',

      // Request this scope at user authentication time
      scope: 'read:current_user',

      // Specify configuration for the interceptor
      httpInterceptor: {
        allowedList: [
          {
            // Match any request that starts 'https://dev-dyft8jys.us.auth0.com/api/v2/' (note the asterisk)
            uri: 'https://dev-dyft8jys.us.auth0.com/api/v2/*',
            tokenOptions: {
              // The attached token should target this audience
              audience: 'https://dev-dyft8jys.us.auth0.com/api/v2/',

              // The attached token should have these scopes
              scope: 'read:current_user',
            },
          },
        ],
      },
    }),
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
