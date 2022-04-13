import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Import the module from the SDK
import { AuthModule } from '@auth0/auth0-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BodyComponent } from './components/body/body.component';
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginbuttonComponent } from './components/loginbutton/loginbutton.component';
import { LogoutbuttonComponent } from './components/logoutbutton/logoutbutton.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    MenuComponent,
    LoginComponent,
    RegisterComponent,
    LoginbuttonComponent,
    LogoutbuttonComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule.forRoot({
      domain: 'dev-dyft8jys.us.auth0.com',
      clientId: 'kuq2N6i9avOgbN2zFhloF7HAacDxxu96',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
