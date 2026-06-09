import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { 
  LucideAngularModule,
  GraduationCap,
  CheckCircle,
  AlertTriangle,
  Lock,
  Unlock,
  BookOpen,
  Library,
  FileText,
  CreditCard,
  Award,
  Activity,
  ArrowRight,
  RefreshCw,
  Info,
  User,
  ExternalLink
} from 'lucide-angular';
import { StudentService } from '../../services/student.service';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: any;
  route: string | null;
  requiresActive: boolean;
}

type SimulationState = 'activo' | 'pendiente_pago' | 'bloqueado';

@Component({
  selector: 'app-estado-academico',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './estado-academico.html',
  styleUrls: ['./estado-academico.css']
})
export class EstadoAcademicoComponent implements OnInit {
  // Icons mapping for template
  icons = {
    GraduationCap,
    CheckCircle,
    AlertTriangle,
    Lock,
    Unlock,
    BookOpen,
    Library,
    FileText,
    CreditCard,
    Award,
    Activity,
    ArrowRight,
    RefreshCw,
    Info,
    User,
    ExternalLink
  };

  // Student info
  studentName = '';
  studentEmail = '';
  studentCareer = '';
  studentRut = '';

  // Simulator State
  currentState: SimulationState = 'activo';

  // Modal controls
  showModal = false;
  modalTitle = '';
  modalMessage = '';
  modalServiceId = '';

  // Toast controls
  showToast = false;
  toastMessage = '';

  services: ServiceItem[] = [
    {
      id: 'inscripcion',
      title: 'Inscripción de Asignaturas',
      description: 'Toma de ramos, inscripción de electivos y selección de horarios para el semestre.',
      icon: BookOpen,
      route: '/inscripcion',
      requiresActive: true,
    },
    {
      id: 'biblioteca',
      title: 'Biblioteca Digital',
      description: 'Acceso completo a catálogos en línea, libros digitales y revistas indexadas.',
      icon: Library,
      route: null,
      requiresActive: true,
    },
    {
      id: 'certificados',
      title: 'Certificados Académicos',
      description: 'Descarga instantánea de certificado de alumno regular y avance curricular.',
      icon: FileText,
      route: null,
      requiresActive: true,
    },
    {
      id: 'tui',
      title: 'Tarjeta Universitaria (TUI)',
      description: 'Acceso a credencial universitaria digital, convenios y control de accesos.',
      icon: CreditCard,
      route: null,
      requiresActive: true,
    },
    {
      id: 'beneficios',
      title: 'Beneficios y Becas',
      description: 'Consulta estado de becas ministeriales, internas y asignaciones de alimentación.',
      icon: Award,
      route: null,
      requiresActive: false,
    },
    {
      id: 'deportes',
      title: 'Gimnasio y Deportes',
      description: 'Reserva de canchas, inscripción en talleres deportivos y uso de gimnasio.',
      icon: Activity,
      route: null,
      requiresActive: true,
    }
  ];

  constructor(
    private router: Router,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    const student = this.studentService.getStudentData();
    const user = (this.studentService as any).loginService?.getUser() || {};
    
    this.studentName = student.nombre;
    this.studentEmail = student.email;
    this.studentCareer = student.carrera || 'Ingeniería Civil en Computación e Informática';
    this.studentRut = user.rut || '19.482.384-K';

    // Auto-detect based on localstorage
    const data = localStorage.getItem('historial_matriculas');
    const matriculas = data ? JSON.parse(data) : [];
    if (matriculas.length > 0) {
      this.currentState = 'activo';
    } else {
      this.currentState = 'pendiente_pago';
    }
  }

  setSimulationState(state: SimulationState) {
    this.currentState = state;
    this.triggerToast(`Estado simulado: ${this.getStateLabel(state)}`);
  }

  getStateLabel(state: SimulationState): string {
    switch (state) {
      case 'activo': return 'Matriculado / Activo';
      case 'pendiente_pago': return 'Pendiente de Pago';
      case 'bloqueado': return 'Bloqueo Académico';
    }
  }

  isServiceAvailable(service: ServiceItem): boolean {
    if (this.currentState === 'activo') return true;
    if (!service.requiresActive) return true;
    return false;
  }

  handleServiceClick(service: ServiceItem) {
    if (this.isServiceAvailable(service)) {
      if (service.route) {
        this.router.navigate([service.route]);
      } else {
        this.modalTitle = `Servicio: ${service.title}`;
        this.modalMessage = `El servicio de "${service.title}" está disponible y operativo. (Enlace de demostración externo).`;
        this.modalServiceId = service.id;
        this.showModal = true;
      }
    } else {
      this.modalTitle = `Acceso Denegado: ${service.title}`;
      this.modalServiceId = service.id;
      if (this.currentState === 'pendiente_pago') {
        this.modalMessage = `Este servicio requiere una matrícula activa. Actualmente tu pago se encuentra en proceso de validación. Por favor, regulariza tu pago de arancel o comunícate con Tesorería.`;
      } else {
        this.modalMessage = `Este servicio está bloqueado debido a que no cuentas con una matrícula vigente para este periodo académico. Debes iniciar e ingresar tu matrícula para el periodo regular.`;
      }
      this.showModal = true;
    }
  }

  closeModal() {
    this.showModal = false;
  }

  triggerToast(msg: string) {
    this.toastMessage = msg;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

  irAPagar() {
    this.router.navigate(['/matricula']);
  }
}
