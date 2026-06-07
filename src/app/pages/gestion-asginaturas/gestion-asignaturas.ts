import { Component, ChangeDetectorRef } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { ASIGNATURAS } from '../../data/asignaturas.data';

import { Asignatura } from '../../models/asignatura';

import { ToastService } from '../../services/toast.service';
import { ToastComponent } from '../../components/toast/toast.component';

@Component({
  selector: 'app-gestion-asignaturas',
  imports: [ToastComponent, FormsModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './gestion-asignaturas.html',
  styleUrl: './gestion-asignaturas.css',
})
export class GestionAsignaturas {
  asignaturas: Asignatura[] = ASIGNATURAS;

  asignaturasDisponibles: Asignatura[] = [];
  requisitosTemp: { codigo: string; nombre: string }[] = [];

  asignaturaEditando: Asignatura | null = null;
  codigoAsignaturaEditando: string | null = null;
  requisitoSeleccionado: Asignatura | null = null;
  asignaturaDestacada: string | null = null;
  requisitoAbierto: string | null = null;

  codigoEditarAsignatura = '';
  codigoAsignaturaEliminar = '';
  nombreAsignaturaEliminar = '';
  nuevoRequisito = '';
  asignaturaSeleccionada = '';
  asignaturaForm!: FormGroup;

  mostrarFormularioAsignatura = false;
  mostrarConfirmacionEliminar = false;
  verRequisitosModal = false;

  constructor(
    private toastService: ToastService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.asignaturaForm = this.fb.group({
      codigo: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]],
      tipo: ['Obligatoria', Validators.required],
      creditos: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
      horasPresenciales: [1, [Validators.required, Validators.min(1), Validators.max(100)]],
      horasAutonomas: [1, [Validators.required, Validators.min(1), Validators.max(100)]],
    });
  }

  guardarAsignatura(): void {
    if (!this.validarAsignatura()) {
      return;
    }
    const asignatura = this.construirAsignatura();

    if (this.asignaturaEditando) {
      this.actualizarAsignaturaExistente(asignatura);

      this.toastService.show('Asignatura actualizada correctamente', 'success');
    } else {
      this.asignaturas = [...this.asignaturas, asignatura];

      this.toastService.show('Asignatura creada correctamente', 'success');
    }

    this.cerrarFormularioAsignatura();
  }

  private actualizarAsignaturaExistente(asignatura: Asignatura): void {
    const index = this.asignaturas.findIndex((a) => a.codigo === this.codigoAsignaturaEditando);

    if (index === -1) {
      return;
    }

    this.asignaturas[index] = asignatura;

    this.asignaturas = [...this.asignaturas];
  }

  private construirAsignatura(): Asignatura {
    const form = this.asignaturaForm.getRawValue();

    return {
      codigo: form.codigo.trim().toUpperCase(),
      nombre: form.nombre,
      caracter: form.tipo,

      creditos: form.creditos,
      horasPresenciales: form.horasPresenciales,
      horasAutonomas: form.horasAutonomas,

      requisitos: [...this.requisitosTemp],
    };
  }

  abrirFormularioAsignatura(asignatura?: Asignatura): void {
    this.asignaturaEditando = asignatura ?? null;
    this.codigoAsignaturaEditando = asignatura?.codigo ?? '';

    this.asignaturaForm.patchValue({
      codigo: asignatura?.codigo ?? '',
      nombre: asignatura?.nombre ?? '',
      tipo: asignatura?.caracter ?? 'Obligatoria',

      creditos: asignatura?.creditos ?? 1,
      horasPresenciales: asignatura?.horasPresenciales ?? 1,
      horasAutonomas: asignatura?.horasAutonomas ?? 1,
    });
    this.requisitosTemp = [...(asignatura?.requisitos ?? [])];

    this.mostrarFormularioAsignatura = true;
  }

  cerrarFormularioAsignatura(): void {
    this.mostrarFormularioAsignatura = false;

    this.asignaturaEditando = null;
    this.codigoAsignaturaEditando = '';

    this.asignaturaForm.reset({
      codigo: '',
      nombre: '',
      tipo: 'Obligatoria',

      creditos: 1,
      horasPresenciales: 1,
      horasAutonomas: 1,
    });

    this.requisitosTemp = [];
  }

  eliminarAsignatura(): void {
    this.asignaturas = this.asignaturas.filter((x) => x.codigo !== this.codigoAsignaturaEliminar);
    this.toastService.show('Asignatura eliminada', 'success');

    this.mostrarConfirmacionEliminar = false;
  }

  preguntarEliminar(codigo: string, nombre: string): void {
    this.codigoAsignaturaEliminar = codigo;
    this.nombreAsignaturaEliminar = nombre;
    this.mostrarConfirmacionEliminar = true;
  }

  verRequisito(codigo: string): void {
    const asignatura = this.asignaturasDisponibles.find((a) => a.codigo === codigo);

    if (!asignatura) {
      return;
    }

    const requisitos = asignatura.requisitos;

    if (requisitos.length === 0) {
      this.toastService.show('Esta asignatura no tiene requisitos', 'danger');
      return;
    }

    const mensaje = requisitos.map((r) => `${r.codigo} - ${r.nombre}`).join('\n');

    alert(`Requisitos para ${asignatura.nombre}:\n\n${mensaje}`);
  }

  agregarRequisito(): void {
    if (!this.requisitoSeleccionado) return;

    const existe = this.requisitosTemp.some((r) => r.codigo === this.requisitoSeleccionado!.codigo);

    if (existe) return;

    this.requisitosTemp.push({
      codigo: this.requisitoSeleccionado.codigo,
      nombre: this.requisitoSeleccionado.nombre,
    });

    this.requisitoSeleccionado = null;
  }

  eliminarRequisito(codigo: string): void {
    this.requisitosTemp = this.requisitosTemp.filter((r) => r.codigo !== codigo);
  }

  toggleRequisitos(codigo: string): void {
    if (this.requisitoAbierto === codigo) {
      this.requisitoAbierto = null;
    } else {
      this.requisitoAbierto = codigo;
    }
  }

  irAAsignatura(codigo: string): void {
    this.asignaturaDestacada = null;

    this.cdr.detectChanges();

    this.asignaturaDestacada = codigo;

    document.getElementById('asig-' + codigo)?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });

    setTimeout(() => {
      this.asignaturaDestacada = null;
    }, 1000);
  }

  private validarAsignatura(): boolean {
    const codigoControl = this.asignaturaForm.get('codigo');

    if (codigoControl?.hasError('required')) {
      this.toastService.error('El código de la asignatura no puede estar vacío');
      return false;
    }

    if (codigoControl?.hasError('pattern')) {
      this.toastService.error('Solo se permiten letras y números para el código');
      return false;
    }

    const codigo = codigoControl?.value?.trim().toUpperCase();

    const existe = this.asignaturas.some(
      (a) => a.codigo.toUpperCase() === codigo && a.codigo !== this.codigoAsignaturaEditando,
    );

    if (existe) {
      this.toastService.error('Ya existe una asignatura con ese código');
      return false;
    }

    const nombre = this.asignaturaForm.get('nombre');

    if (nombre?.hasError('required')) {
      this.toastService.error('El nombre de la asignatura no puede estar vacío');
      return false;
    }

    if (nombre?.hasError('pattern')) {
      this.toastService.error('Solo se permiten letras y espacios para el nombre');
      return false;
    }

    const creditos = this.asignaturaForm.value.creditos;

    if (creditos < 1 || creditos > 10) {
      this.toastService.show('Los créditos deben estar entre 1 y 10', 'danger');
      return false;
    }

    const horasPresenciales = this.asignaturaForm.value.horasPresenciales;

    if (horasPresenciales < 1 || horasPresenciales > 100) {
      this.toastService.show('Las horas presenciales deben estar entre 1 y 100', 'danger');
      return false;
    }

    const horasAutonomas = this.asignaturaForm.value.horasAutonomas;

    if (horasAutonomas < 1 || horasAutonomas > 100) {
      this.toastService.show('Los horas autónomas deben estar entre 1 y 100', 'danger');
      return false;
    }

    return true;
  }

  soloLetrasNumeros(event: KeyboardEvent): void {
    const tecla = event.key;

    const pattern = /^[a-zA-Z0-9]$/;

    if (!pattern.test(tecla)) {
      event.preventDefault();
      this.toastService.error('Solo se permiten letras y números');
    }
  }

  soloLetras(event: KeyboardEvent): void {
    const tecla = event.key;

    const pattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]$/;

    if (!pattern.test(tecla)) {
      event.preventDefault();
      this.toastService.error('Solo se permiten letras para el nombre de la asignatura');
    }
  }
}
