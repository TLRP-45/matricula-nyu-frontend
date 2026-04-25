import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StepperComponent } from '../../components/stepper/stepper.component';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [CommonModule, StepperComponent],
  templateUrl: './info.html',
  styleUrls: ['./info.css']
})
export class InfoComponent {

  pasoActual = 2;
  carreraEstudiante: string;

  constructor(
    private router: Router,
    private studentService: StudentService
  ) {
    this.carreraEstudiante = this.studentService.getStudentCareer();
  }

  continuar() {
    this.router.navigate(['/estado']);
  }

  volver() {
    this.router.navigate(['/matricula']);
  }
}