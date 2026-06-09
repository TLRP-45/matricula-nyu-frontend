import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { rutValidator } from '../../validators/rut.validator';
import { RutFormatDirective } from '../../directive/rut-format.directive';
import { Role } from '../../models/roles';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RutFormatDirective],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  carreras: any[] = [];
  readonly roles = [
    { value: Role.ADMIN, label: 'Administrador' },
    { value: Role.STUDENT, label: 'Estudiante' }
  ];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public router: Router
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      rut: ['', [Validators.required, rutValidator()]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required, 
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)
      ]],
      nacionalidad: ['', Validators.required],
      sexo: ['', Validators.required],
      nacimiento: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9+]+$')]],
      rol: [Role.STUDENT, Validators.required],
      ID_carrera: ['']
    });
  }

  ngOnInit(): void {
    this.userService.getCarreras().subscribe({
      next: (res: any) => {
        this.carreras = res || [];
      },
      error: (err) => {
        console.error('Error fetching careers:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const payload = { ...this.registerForm.value };
      if (Number(payload.rol) === Role.STUDENT) {
        if (!payload.ID_carrera) {
          alert('Debe seleccionar una carrera');
          return;
        }
        payload.ID_carrera = Number(payload.ID_carrera);
      } else {
        delete payload.ID_carrera;
      }

      this.loading = true;
      this.userService.register(payload).subscribe({
        next: (res: any) => {
          this.loading = false;
          if (res.success) {
            alert('Usuario registrado con éxito');
            this.router.navigate(['/admin']);
          } else {
            alert('Error: ' + res.mensaje);
          }
        },
        error: (err) => {
          this.loading = false;
          alert('Error en el servidor');
          console.error(err);
        }
      });
    } else {
      this.markFormGroupTouched(this.registerForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }
}
