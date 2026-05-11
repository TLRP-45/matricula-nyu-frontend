import { Component } from '@angular/core';
import {
  LucideAngularModule,
  Home,
  Users,
  FileText,
  Settings,
  BarChart3,
  GraduationCap,
  Calendar,
  LogOut,
  BookOpen
} from 'lucide-angular';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent {
  icons = {
    Home,
    Users,
    FileText,
    Settings,
    BarChart3,
    GraduationCap,
    Calendar,
    LogOut,
    BookOpen
  };

  constructor(
    private router: Router,
    private loginService: LoginService
  ) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  logout() {
    this.loginService.logOut();
    this.router.navigate(['/login']);
  }
}