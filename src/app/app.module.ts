import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { GooglemapsModule } from './googlemaps/googlemaps.module';
import { MaterialModule } from './components/material/material.module';
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Import the injector module and the HTTP client module from Angular
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpClient,
} from '@angular/common/http';

// Translate
import {
  TranslateModule,
  TranslateLoader,
  TranslateService,
} from '@ngx-translate/core';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Pipes
import { FechaPipe } from './pipes/fecha.pipe';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BodyComponent } from './components/body/body.component';
import { MenuComponent } from './components/menus/menu/menu.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MisEventosComponent } from './components/events/mis-eventos/mis-eventos.component';
import { MenuInfoComponent } from './components/menus/menu-info/menu-info.component';
import { CrearEventoComponent } from './components/events/crear-evento/crear-evento.component';
import { MenuBusquedaComponent } from './components/menus/menu-busqueda/menu-busqueda.component';
import { ProximosEventosComponent } from './components/events/proximos-eventos/proximos-eventos.component';
import { LikeEventosComponent } from './components/events/like-eventos/like-eventos.component';
import { ListarEventosTablaComponent } from './components/events/listar-eventos-tabla/listar-eventos-tabla.component';
import { ModalEventoComponent } from './components/events/modal-evento/modal-evento.component';
import { ListarEventosCardComponent } from './components/events/listar-eventos-card/listar-eventos-card.component';
import { ListarEventosComponent } from './components/admin/listar-eventos/listar-eventos.component';
import { ListarUsuariosComponent } from './components/admin/listar-usuarios/listar-usuarios.component';
import { Page404Component } from './components/errors/page404/page404.component';
import { Page401Component } from './components/errors/page401/page401.component';
import { Page403Component } from './components/errors/page403/page403.component';
import { ListaEventosComponent } from './components/events/lista-eventos/lista-eventos.component';
import { DeleteComponent } from './components/dialog/delete/delete.component';
import { AboutComponent } from './components/dialog/about/about.component';
import { DeleteUserComponent } from './components/dialog/delete-user/delete-user.component';
import { DeleteEventoComponent } from './components/dialog/delete-evento/delete-evento.component';
import { ParticipandoEventosComponent } from './components/events/participando-eventos/participando-eventos.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    MenuComponent,
    ProfileComponent,
    MisEventosComponent,
    MenuInfoComponent,
    CrearEventoComponent,
    FechaPipe,
    MenuBusquedaComponent,
    ProximosEventosComponent,
    LikeEventosComponent,
    ListarEventosTablaComponent,
    ModalEventoComponent,
    ListarEventosCardComponent,
    ListarEventosComponent,
    ListarUsuariosComponent,
    Page404Component,
    Page401Component,
    Page403Component,
    ListaEventosComponent,
    DeleteComponent,
    AboutComponent,
    DeleteUserComponent,
    DeleteEventoComponent,
    ParticipandoEventosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDzjKgXo682mL_NZCN0wqb4qhrQlSMrkNg',
    }),
    GooglemapsModule,
    BrowserAnimationsModule,
    MaterialModule,
    AuthModule,
    CoreModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
