import { Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { authGuard, notLogged } from '../guards/auth.guard';
import { HomeComponent } from '../home/home.component';

export const routes: Routes = [
    {
    path: 'login',
    component: LoginComponent,
    canActivate: [notLogged]
    },
    {
    path:'',
    redirectTo: 'login',
    pathMatch: 'full'
    },
    {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard]
    },
    {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
    }
];
