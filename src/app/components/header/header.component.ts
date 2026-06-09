import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  LucideAngularModule,
  Menu,
  Home,
  HelpCircle,
  PlayCircle,
  FileText,
  User,
  LogOut,
  Mail,
  CreditCard,
  UserPlus,
  GraduationCap
} from 'lucide-angular';
import { LoginService } from '../../services/login.service';
import { Role } from '../../models/roles';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent implements OnInit {
  icons = {
    Menu,
    Home,
    HelpCircle,
    PlayCircle,
    FileText,
    User,
    LogOut,
    Mail,
    CreditCard,
    UserPlus,
    GraduationCap
  };
  user: any;
  nombreEstudiante: string = '';
  isAdmin: boolean = false;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = this.loginService.getUser();
    this.nombreEstudiante = this.user ? this.user.nombre : 'Estudiante';
    this.isAdmin = this.loginService.hasRole(Role.ADMIN);
  }

  logout() {
    this.loginService.logOut();
    this.router.navigate(['/login']);
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}