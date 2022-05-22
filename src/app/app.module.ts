import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { GooglemapsModule } from './googlemaps/googlemaps.module';
import { MaterialModule } from './components/material/material.module';

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
import { MenuComponent } from './components/menus/menu/menu.component';
import { LoginbuttonComponent } from './components/loginbutton/loginbutton.component';
import { LogoutbuttonComponent } from './components/logoutbutton/logoutbutton.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MisEventosComponent } from './components/events/mis-eventos/mis-eventos.component';
import { MenuBusquedaRapidaComponent } from './components/menus/menu-busqueda-rapida/menu-busqueda-rapida.component';
import { CrearEventoComponent } from './components/events/crear-evento/crear-evento.component';
import { FechaPipe } from './pipes/fecha.pipe';
import { MenuBusquedaComponent } from './components/menus/menu-busqueda/menu-busqueda.component';
import { ProximosEventosComponent } from './components/events/proximos-eventos/proximos-eventos.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LikeEventosComponent } from './components/events/like-eventos/like-eventos.component';

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
    MisEventosComponent,
    MenuBusquedaRapidaComponent,
    CrearEventoComponent,
    FechaPipe,
    MenuBusquedaComponent,
    ProximosEventosComponent,
    LikeEventosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
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
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDzjKgXo682mL_NZCN0wqb4qhrQlSMrkNg',
    }),
    GooglemapsModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
