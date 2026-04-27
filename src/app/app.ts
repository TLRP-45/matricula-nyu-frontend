import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CommonModule], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  constructor(private router: Router) {}

  showHeader(): boolean {
    return this.router.url !== '/login';
  }
}