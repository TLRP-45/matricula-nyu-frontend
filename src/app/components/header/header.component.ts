import { Component } from '@angular/core';
import {
  LucideAngularModule,
  Menu,
  Home,
  HelpCircle,
  PlayCircle,
  FileText
} from 'lucide-angular';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {
  icons = {
    Menu,
    Home,
    HelpCircle,
    PlayCircle,
    FileText
  };

  nombreEstudiante: string = '';

  constructor(private loginService: LoginService) {
    const user = this.loginService.getUser();
    this.nombreEstudiante = user ? user.nombre : 'Estudiante';
  }
}
