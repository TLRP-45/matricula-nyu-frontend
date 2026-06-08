import { Routes } from '@angular/router';
import { InscripcionAsignaturas } from './components/inscripcion-asignaturas/inscripcion-asignaturas';
import { MatriculaComponent } from './pages/matricula/matricula';
import { InfoComponent } from './pages/info/info';
import { EstadoComponent } from './pages/estado/estado';
import { ConfirmacionComponent } from './pages/confirmacion/confirmacion';
import { FinalizadoComponent } from './pages/finalizado/finalizado';
import { MaPrincipalComponent } from './pages/ma-principal/ma-principal';
import { LoginComponent } from './login/login.component';
import { authGuard, notLogged } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { OfertaAcademica } from './pages/oferta-academica/oferta-academica/oferta-academica';
import { AdminCarrerasComponent } from './pages/admin-carreras/admin-carreras';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { Role } from './models/roles';
import { MallaCurricular } from './pages/malla-curricular/malla-curricular';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [notLogged],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    //canActivate: [authGuard],
    //data: { role: Role.ADMIN },
    children: [
      {
        path: '',
        redirectTo: 'carreras',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        redirectTo: 'carreras',
        pathMatch: 'full'
      },
      {
        path: 'carreras',
        component: AdminCarrerasComponent
      }
    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [authGuard],
        data: { role: Role.STUDENT }
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
        path: 'oferta-academica',
        component: OfertaAcademica,
        canActivate: [authGuard],
        data: { role: Role.STUDENT }
      },
      {
        path: 'malla-curricular',
        component: MallaCurricular,
        //canActivate: [authGuard],
        data: { role: Role.STUDENT }
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];