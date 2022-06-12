import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { BodyComponent } from './components/body/body.component'
import { ProfileComponent } from './components/profile/profile.component'
import { MisEventosComponent } from './components/events/mis-eventos/mis-eventos.component'
import { CrearEventoComponent } from './components/events/crear-evento/crear-evento.component'
import { LikeEventosComponent } from './components/events/like-eventos/like-eventos.component'
import { ListarEventosComponent } from './components/admin/listar-eventos/listar-eventos.component'
import { RegisterComponent } from './auth/register/register.component'
import { LoginComponent } from './auth/login/login.component'
import { AuthGuard } from './core/guards/auth.guard'
import { ListarUsuariosComponent } from './components/admin/listar-usuarios/listar-usuarios.component'
import { Page404Component } from './components/errors/page404/page404.component'
import { ParticipandoEventosComponent } from './components/events/participando-eventos/participando-eventos.component'

const routes: Routes = [
  { path: '', component: BodyComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'saveEvent',
    component: CrearEventoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'saveEvent/:id',
    component: CrearEventoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'listEvents',
    component: MisEventosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'likes',
    component: LikeEventosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'activity',
    component: ParticipandoEventosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/listEvents',
    component: ListarEventosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/listUsers',
    component: ListarUsuariosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'not-found',
    component: Page404Component
  },
  { path: '**', component: BodyComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
