import { Injectable } from '@angular/core';
import { LoginService } from '../../services/login.service';

export interface StudentData {
  nombre: string;
  email: string;
  carrera: string;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private studentData: StudentData = {
//    nombre: 'Juan Alex Fuentes Valdivia',
//    email: 'JFuentes@gmail.com',
//    carrera: '534-INGENIERÍA CIVIL EN COMPUTACIÓN E INFORMÁTICA (Año Ingreso 2023)'
    nombre: 'Estudiante',
    email: '',
    carrera: ''
  };

  constructor(private loginService: LoginService) { }

  private esRenovacion = false;
  private historialTemporal: any[] = [];

  setRenovacion(valor: boolean) {
    this.esRenovacion = valor;
  }

  getRenovacion(): boolean {
    return this.esRenovacion;
  }

  getStudentData(): StudentData {
    const user = this.loginService.getUser();
    if (user) {
      return {
        nombre: user.nombre,
        email: user.email || this.studentData.email,
        carrera: user.carrera || this.studentData.carrera
      };
    }
    return this.studentData;
  }

  getStudentName(): string {
    const user = this.loginService.getUser();
    return user ? user.nombre : this.studentData.nombre;
  }

  getStudentEmail(): string {
    const user = this.loginService.getUser();
    return user ? user.email : this.studentData.email;
  }

  getStudentCareer(): string {
    const user = this.loginService.getUser();
    return user ? user.carrera : this.studentData.carrera;
  }

  setHistorialTemporal(historial: any[]) {
    this.historialTemporal = historial;
  }

  getHistorialTemporal(): any[] {
    return this.historialTemporal;
  }
}