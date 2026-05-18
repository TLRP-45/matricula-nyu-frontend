import { Routes } from '@angular/router';
import { InscripcionAsignaturas } from './components/inscripcion-asignaturas/inscripcion-asignaturas';
import { MatriculaComponent } from './pages/matricula/matricula';
import { InfoComponent } from './pages/info/info';
import { EstadoComponent } from './pages/estado/estado';
import { ConfirmacionComponent } from './pages/confirmacion/confirmacion';
import { FinalizadoComponent } from './pages/finalizado/finalizado';
import { MaPrincipalComponent } from './pages/ma-principal/ma-principal';
import { LoginComponent } from '../login/login.component';
import { authGuard, notLogged } from '../guards/auth.guard';
import { HomeComponent } from '../home/home.component';
import { OfertaAcademica } from './pages/oferta-academica/oferta-academica/oferta-academica';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [notLogged],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'inscripcion',
    component: InscripcionAsignaturas,
    canActivate: [authGuard],
  },
  {
    path: 'matricula',
    component: MatriculaComponent,
    canActivate: [authGuard],
  },
  {
    path: 'info',
    component: InfoComponent,
    canActivate: [authGuard],
  },
  {
    path: 'estado',
    component: EstadoComponent,
    canActivate: [authGuard],
  },
  {
    path: 'confirmacion',
    component: ConfirmacionComponent,
    canActivate: [authGuard],
  },
  {
    path: 'finalizado',
    component: FinalizadoComponent,
    canActivate: [authGuard],
  },
  {
    path: 'ma-principal',
    component: MaPrincipalComponent,
    canActivate: [authGuard],
  },
  {
    path: 'oferta-academica',
    component: OfertaAcademica,
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
