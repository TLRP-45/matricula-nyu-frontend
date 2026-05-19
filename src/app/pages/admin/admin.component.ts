import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  adminName = 'Administrador Sistema';
  
  stats = [
    { label: 'Estudiantes Matriculados', value: 1250, icon: 'bi-people' },
    { label: 'Procesos Pendientes', value: 45, icon: 'bi-clock-history' },
    { label: 'Ingresos Mensuales', value: '$45M', icon: 'bi-currency-dollar' }
  ];

  recentActions = [
    { user: 'Juan Pérez', action: 'Matrícula Realizada', time: 'hace 5 min' },
    { user: 'María García', action: 'Inscripción de Ramos', time: 'hace 12 min' },
    { user: 'Admin', action: 'Actualización de Sistema', time: 'hace 1 hora' }
  ];

  constructor(
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {}

  logout() {
    this.loginService.logOut();
    this.router.navigate(['/login']);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
