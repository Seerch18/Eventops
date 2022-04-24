import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './components/body/body.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { ExternalapiComponent } from './components/externalapi/externalapi.component';
import { MisEventosComponent } from './components/events/mis-eventos/mis-eventos.component';

const routes: Routes = [
  { path: '', component: BodyComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: 'externalapi',
    component: ExternalapiComponent,
    canActivate: [AuthGuard],
  },
  { path: 'listEvents' , component: MisEventosComponent},
  { path: '**', component: BodyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
