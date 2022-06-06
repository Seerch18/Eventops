import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthButtonComponent } from './auth-button/auth-button.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    AuthButtonComponent,
    LogoutComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatSliderModule,
    TranslateModule,
  ],
  exports: [
    RegisterComponent,
    LoginComponent,
    AuthButtonComponent,
    LogoutComponent,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatSliderModule,
    TranslateModule,
  ],
})
export class AuthModule {}
