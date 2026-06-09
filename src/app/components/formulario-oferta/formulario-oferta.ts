import { Component, Input, Output, EventEmitter, input } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormsModule, Validators } from '@angular/forms';

import { Oferta } from '../../models/oferta';
import { BloqueHorario } from '../../models/bloque-horario';

import { HorarioService } from '../../services/horario.service';
import { OfertaAcademicaService } from '../../services/oferta-academica.service';
import { Grupo } from '../../models/grupo';
import { FormGroup } from '@angular/forms';
import { ToastService } from '../../services/toast.service';
import { HorarioGrupo } from '../../models/horario-grupo';
import { DIAS_SEMANA } from '../../data/dias-semana.data';

@Component({
  selector: 'app-formulario-oferta',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './formulario-oferta.html',
  styleUrl: './formulario-oferta.css',
})
export class FormularioOferta {
  horariosTemp: HorarioGrupo[] = [];

  ofertaForm!: FormGroup;

  diasSemana = DIAS_SEMANA;

  @Input({ required: true })
  oferta!: Oferta;

  @Input()
  bloques: BloqueHorario[] = [];

  @Input() esEdicion = false;

  @Input() grupoEditar: Grupo | null = null;

  @Output()
  guardar = new EventEmitter<Oferta>();

  @Output()
  cancelar = new EventEmitter<void>();

  constructor(
    private horarioService: HorarioService,
    private ofertaAcademicaService: OfertaAcademicaService,
    private toastService: ToastService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.ofertaForm = this.fb.group({
      tipo: ['catedra', Validators.required],
      letra: ['A', Validators.required],
      profesor: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]],
      cupos: [5, [Validators.required, Validators.min(5), Validators.max(50)]],
    });

    if (!this.grupoEditar) {
      return;
    }

    this.ofertaForm.patchValue({
      tipo: this.grupoEditar.tipo,
      letra: this.grupoEditar.letra,
      profesor: this.grupoEditar.profesor,
      cupos: this.grupoEditar.cupos,
    });

    this.horariosTemp = this.grupoEditar.horarios.map((h) => ({
      ...h,
    }));
  }

  guardarOferta(): void {
    if (!this.validarOferta()) {
      return;
    }

    const nuevaOferta = this.crearOferta();

    this.guardar.emit(nuevaOferta);
  }

  agregarHorario(): void {
    const horario = this.horarioService.agregarHorario(this.horariosTemp, this.bloques);

    this.horariosTemp.push(horario);
  }

  eliminarHorario(index: number): void {
    this.horariosTemp.splice(index, 1);
  }

  onHoraInicioChangeTemp(index: number): void {
    this.horarioService.actualizarBloqueHorario(this.horariosTemp[index]);
  }

  private validarOferta(): boolean {
    const cupos = this.ofertaForm.value.cupos;

    if (cupos < 5 || cupos > 50) {
      this.toastService.show('Los cupos deben estar entre 5 y 50', 'danger');
      return false;
    }

    const profesor = this.ofertaForm.get('profesor');

    if (profesor?.hasError('required')) {
      this.toastService.error('El nombre del profesor no puede estar vacío');
      return false;
    }

    if (profesor?.hasError('pattern')) {
      this.toastService.error('Solo se permiten letras y espacios para el profesor');
      return false;
    }

    if (this.horariosTemp.length === 0) {
      this.toastService.show('Debe agregar al menos un horario', 'danger');
      return false;
    }

    const duplicado = this.horarioService.hayHorariosDuplicados(this.horariosTemp);

    if (duplicado) {
      this.toastService.error(`Horario duplicado: ${duplicado}`);

      return false;
    }

    if (this.ofertaForm.invalid) {
      this.toastService.show('Formulario inválido', 'danger');
      return false;
    }

    return true;
  }

  private crearGrupo(): Grupo {
    return this.ofertaAcademicaService.crearGrupo(this.ofertaForm.value, this.horariosTemp);
  }

  private crearOferta(): Oferta {
    const grupo = this.crearGrupo();

    return this.ofertaAcademicaService.crearOferta(this.oferta, grupo, this.ofertaForm.value.tipo);
  }

  validarCupos(): void {
    const control = this.ofertaForm.get('cupos');

    if (!control) return;

    let valor = Number(control.value);

    if (isNaN(valor)) {
      valor = 0;
    }

    if (valor < 0) {
      control.setValue(0);

      this.toastService.error('Mínimo 5 cupos requeridos');
    }

    if (valor > 70) {
      control.setValue(70);

      this.toastService.error('Máximo 70 cupos permitidos');
    }
  }

  bloquearCuposInvalidos(event: KeyboardEvent): void {
    const teclasPermitidas = ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight'];

    if (teclasPermitidas.includes(event.key)) {
      return;
    }

    if (!/^\d$/.test(event.key)) {
      event.preventDefault();

      return;
    }

    const input = event.target as HTMLInputElement;

    const valorFuturo = input.value + event.key;

    if (Number(valorFuturo) > 70) {
      event.preventDefault();

      this.toastService.error('Máximo 70 cupos');
    }
  }

  soloLetras(event: KeyboardEvent): void {
    const tecla = event.key;

    const pattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]$/;

    if (!pattern.test(tecla)) {
      event.preventDefault();
      this.toastService.error('Solo se permiten letras para  el nombre del profesor');
    }
  }

  actualizarDiaTemp(index: number, event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.horariosTemp[index].dia = value;
  }
}
