import { Routes } from '@angular/router';

import { MatriculaComponent } from './pages/matricula/matricula';
import { InfoComponent } from './pages/info/info';
import { EstadoComponent } from './pages/estado/estado';
import { ConfirmacionComponent } from './pages/confirmacion/confirmacion';
import { FinalizadoComponent } from './pages/finalizado/finalizado';
import { MaPrincipalComponent } from './pages/ma-principal/ma-principal';
export const routes: Routes = [
  { path: '', redirectTo: 'matricula', pathMatch: 'full' },

  { path: 'matricula', component: MatriculaComponent },
  { path: 'info', component: InfoComponent },
  { path: 'estado', component: EstadoComponent },
  { path: 'confirmacion', component: ConfirmacionComponent },
  { path: 'finalizado', component: FinalizadoComponent },
  { path: 'ma-principal', component: MaPrincipalComponent},
  { path: '**', redirectTo: 'matricula', pathMatch: 'full' }
];