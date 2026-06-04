import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { RutFormatDirective } from '../../directives/rut-format.directive';
import { rutValidator } from '../../validators/rut.validator';
import { Role } from '../../models/roles';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RutFormatDirective],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;


  constructor(
    private loginService: LoginService,
    private router: Router,
    private formBuilder: FormBuilder
  ){
    this.loginForm = this.formBuilder.group({
      rut: new FormControl ('', [Validators.required, rutValidator()]),
      password: ['', Validators.required],
      isAdmin: [false]
    });
  }
  ngOnInit() {
    localStorage.clear();
    sessionStorage.clear();
  }


  public logIn(): void{
    if(this.loginForm.valid){
      const rut = this.loginForm.get('rut')?.value
      const password = this.loginForm.get('password')?.value
      const isAdmin = this.loginForm.get('isAdmin')?.value
      this.loginService.login(rut, password, isAdmin).subscribe(response=>{
        if(response.authorized){
            if (isAdmin) {
                this.router.navigateByUrl('admin');
            } else {
                this.router.navigateByUrl('home');
            }
        }else{
            if (response.errorType === 'NOT_ADMIN') {
                alert("Acceso denegado: No tienes permisos de administrador");
            } else if (response.errorType === 'NOT_STUDENT') {
                alert("Acceso denegado: No es necesario iniciar como estudiante.");
            } else {
                alert("Error: Contraseña incorrecta");
            }
        }
      })
      
    }else if(!this.loginForm.get('rut')?.valid){
        alert("Error: RUT inválido, verifiquelo e intente nuevamente.")
    }else{
      alert("Error: Debes ingresar un RUT válido y tu contraseña.")
    }
  }


}