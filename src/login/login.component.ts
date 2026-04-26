import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { RutFormatDirective } from '../directive/rut-format.directive';
import { rutValidator } from '../validators/rut.validator';


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
      password: ['', Validators.required]
    });
  }
  ngOnInit() {
  }


  public logIn(): void{
    if(this.loginForm.valid){
      const rut = this.loginForm.get('rut')?.value
      const password = this.loginForm.get('password')?.value
      this.loginService.login(rut, password).subscribe(response=>{
      if(response.authorized){
            this.router.navigateByUrl('home')
        }else{
          alert("Error: Contraseña incorrecta")
        }
      })
      
    }else if(!this.loginForm.get('rut')?.valid){
        alert("Error: RUT inválido, verifiquelo e intente nuevamente.")
    }else{
      alert("Error: Debes ingresar un RUT válido y tu contraseña.")
    }
  }


}