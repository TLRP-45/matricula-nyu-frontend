import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LucideAngularModule,
  LayoutDashboard,
  Users,
  UserPlus,
  UserCircle2,
  FileText,
  Settings,
  GraduationCap,
  BookOpen,
  LogOut,
} from 'lucide-angular';
import { Router, NavigationEnd } from '@angular/router';
import { CarrerasService } from '../../services/carreras.service';
import { LoginService } from '../../services/login.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {

  activeRoute = '';

  icons = {
    LayoutDashboard,
    Users,
    UserPlus,
    UserCircle2,
    FileText,
    Settings,
    GraduationCap,
    BookOpen,
    LogOut,
  };

  constructor(
    private router: Router,
    private loginService: LoginService,
    private carrerasService: CarrerasService
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        const segments = e.urlAfterRedirects.split('/');
        this.activeRoute = segments[segments.length - 1] || 'dashboard';
      });

    const segments = this.router.url.split('/');
    this.activeRoute = segments[segments.length - 1] || 'dashboard';
  }

  navigateTo(route: string): void {
    this.activeRoute = route;

    if (route === 'dashboard') {
      this.router.navigate(['/admin', 'dashboard']);
      return;
    }

    if (route === 'carreras') {
      this.carrerasService.cargarCarreras();
    }

    this.router.navigate(['/admin', route]);
  }

  logout(): void {
    this.loginService.logOut();
    this.router.navigate(['/login']);
  }
}