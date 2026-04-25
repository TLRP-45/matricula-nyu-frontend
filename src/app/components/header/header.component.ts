import { Component } from '@angular/core';
import {
  LucideAngularModule,
  Menu,
  Home,
  HelpCircle,
  PlayCircle,
  FileText
} from 'lucide-angular';
import { StudentService } from '../../services/student.service';

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

  nombreEstudiante: string;

  constructor(private studentService: StudentService) {
    this.nombreEstudiante = this.studentService.getStudentName();
  }
}