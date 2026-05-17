import { Routes } from '@angular/router';
import { InscripcionAsignaturas } from './components/inscripcion-asignaturas/inscripcion-asignaturas';
import { MatriculaComponent } from './pages/matricula/matricula';
import { InfoComponent } from './pages/info/info';
import { EstadoComponent } from './pages/estado/estado';
import { ConfirmacionComponent } from './pages/confirmacion/confirmacion';
import { FinalizadoComponent } from './pages/finalizado/finalizado';
import { MaPrincipalComponent } from './pages/ma-principal/ma-principal';
import { LoginComponent } from './pages/login/login.component';
import { authGuard, notLogged } from './guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';
import { RegisterComponent } from './pages/register/register.component';
import { Role } from './models/roles';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [notLogged]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
    data: { role: Role.STUDENT }
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard],
    data: { role: Role.ADMIN }
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [authGuard],
    data: { role: Role.ADMIN }
  },
  {
    path: 'inscripcion',
    component: InscripcionAsignaturas,
    canActivate: [authGuard],
    data: { role: Role.STUDENT }
  },
  {
    path: 'matricula',
    component: MatriculaComponent,
    canActivate: [authGuard],
    data: { role: Role.STUDENT }
  },
  {
    path: 'info',
    component: InfoComponent,
    canActivate: [authGuard],
    data: { role: Role.STUDENT }
  },
  {
    path: 'estado',
    component: EstadoComponent,
    canActivate: [authGuard],
    data: { role: Role.STUDENT }
  },
  {
    path: 'confirmacion',
    component: ConfirmacionComponent,
    canActivate: [authGuard],
    data: { role: Role.STUDENT }
  },
  {
    path: 'finalizado',
    component: FinalizadoComponent,
    canActivate: [authGuard],
    data: { role: Role.STUDENT }
  },
  {
    path: 'ma-principal',
    component: MaPrincipalComponent,
    canActivate: [authGuard],
    data: { role: Role.STUDENT }
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
