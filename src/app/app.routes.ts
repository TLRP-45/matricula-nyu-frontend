import { Routes } from '@angular/router';
import { InscripcionAsignaturas } from './components/inscripcion-asignaturas/inscripcion-asignaturas';
import { MatriculaComponent } from './pages/matricula/matricula';
import { InfoComponent } from './pages/info/info';
import { EstadoComponent } from './pages/estado/estado';
import { ConfirmacionComponent } from './pages/confirmacion/confirmacion';
import { FinalizadoComponent } from './pages/finalizado/finalizado';
import { MaPrincipalComponent } from './pages/ma-principal/ma-principal';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { MallaCurricular } from './pages/malla-curricular/malla-curricular';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'inscripcion',
        component: InscripcionAsignaturas
      },
      {
        path: 'matricula',
        component: MatriculaComponent
      },
      {
        path: 'info',
        component: InfoComponent
      },
      {
        path: 'estado',
        component: EstadoComponent
      },
      {
        path: 'confirmacion',
        component: ConfirmacionComponent
      },
      {
        path: 'finalizado',
        component: FinalizadoComponent
      },
      {
        path: 'ma-principal',
        component: MaPrincipalComponent
      },
      {
        path: 'malla-curricular',
        component: MallaCurricular
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },

  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },

  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];