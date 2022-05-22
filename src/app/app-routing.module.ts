import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './components/body/body.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { MisEventosComponent } from './components/events/mis-eventos/mis-eventos.component';
import { CrearEventoComponent } from './components/events/crear-evento/crear-evento.component';
import { LikeEventosComponent } from './components/events/like-eventos/like-eventos.component';

const routes: Routes = [
  { path: '', component: BodyComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: 'saveEvent',
    component: CrearEventoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'saveEvent/:id',
    component: CrearEventoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'listEvents',
    component: MisEventosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'likes',
    component: LikeEventosComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', component: BodyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
