import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { rutValidator } from '../../validators/rut.validator';
import { RutFormatDirective } from '../../directives/rut-format.directive';
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
  readonly roles = [
    { value: Role.ADMIN, label: 'Administrador' },
    { value: Role.STUDENT, label: 'Estudiante' }
  ];

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
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
      rol: [Role.STUDENT, Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.loading = true;
      this.clientService.register(this.registerForm.value).subscribe({
        next: (res) => {
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
