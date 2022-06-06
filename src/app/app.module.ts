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

// Import the injector module and the HTTP client module from Angular
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BodyComponent } from './components/body/body.component';
import { MenuComponent } from './components/menus/menu/menu.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MisEventosComponent } from './components/events/mis-eventos/mis-eventos.component';
import { MenuBusquedaRapidaComponent } from './components/menus/menu-busqueda-rapida/menu-busqueda-rapida.component';
import { CrearEventoComponent } from './components/events/crear-evento/crear-evento.component';
import { FechaPipe } from './pipes/fecha.pipe';
import { MenuBusquedaComponent } from './components/menus/menu-busqueda/menu-busqueda.component';
import { ProximosEventosComponent } from './components/events/proximos-eventos/proximos-eventos.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    MenuComponent,
    ProfileComponent,
    MisEventosComponent,
    MenuBusquedaRapidaComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
