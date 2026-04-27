import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: any;
  menuItems = [
    { title: 'Matrícula', icon: '🎓', route: '/matricula', color: '#57068c' },
    { title: 'Inscripción', icon: '📚', route: '/inscripcion', color: '#7b2cbf' },
    { title: 'Mi Perfil', icon: '👤', route: '/info', color: '#3c096c' },
    { title: 'Solicitudes', icon: '📋', route: '/estado', color: '#9d4edd' },
    { title: 'Portal Matricula', icon: '🏠', route: '/ma-principal', color: '#240046' }
  ];

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = this.loginService.getUser();
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  logout() {
    this.loginService.logOut();
    this.router.navigate(['/login']);
  }
}
