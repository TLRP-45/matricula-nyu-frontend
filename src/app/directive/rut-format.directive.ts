import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appRutFormat]',
  standalone: true
})
export class RutFormatDirective {

  constructor(private el: ElementRef<HTMLInputElement>) {}

  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    // 1. Aseguramos el tipado del target para evitar el error de 'value'
    const input = event.target as HTMLInputElement;
    
    // 2. Limpiamos el valor (solo números y K)
    let value = input.value.toUpperCase().replace(/[^0-9K]/g, '');
    
    if (value.length > 9) {
      value = value.slice(0, 9);
    }

    if (value.length > 1) {
      const dv = value.slice(-1);
      const numbers = value.slice(0, -1);
      
      // Formatear con puntos y guion: 12.345.678-9
      const formatted = numbers.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '-' + dv;
      
      // 3. Seteamos el valor formateado de vuelta al input
      input.value = formatted;
    } else {
      input.value = value;
    }
  }
}
