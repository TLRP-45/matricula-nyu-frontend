import { Injectable } from '@angular/core';

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
    nombre: 'Juan Alex Fuentes Valdivia',
    email: 'JFuentes@gmail.com',
    carrera: '534-INGENIERÍA CIVIL EN COMPUTACIÓN E INFORMÁTICA (Año Ingreso 2023)'
  };

  private esRenovacion = false;
  private historialTemporal: any[] = [];

  setRenovacion(valor: boolean) {
    this.esRenovacion = valor;
  }

  getRenovacion(): boolean {
    return this.esRenovacion;
  }

  getStudentData(): StudentData {
    return this.studentData;
  }

  getStudentName(): string {
    return this.studentData.nombre;
  }

  getStudentEmail(): string {
    return this.studentData.email;
  }

  getStudentCareer(): string {
    return this.studentData.carrera;
  }

  setHistorialTemporal(historial: any[]) {
    this.historialTemporal = historial;
  }

  getHistorialTemporal(): any[] {
    return this.historialTemporal;
  }
}