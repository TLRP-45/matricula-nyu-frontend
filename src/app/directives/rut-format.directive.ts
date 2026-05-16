import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appRutFormat]',
  standalone: true
})
export class RutFormatDirective {

  constructor(private el: ElementRef<HTMLInputElement>) {}

  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.toUpperCase().replace(/[^0-9K]/g, '');
    
    if (value.length > 9) {
      value = value.slice(0, 9);
    }

    if (value.length > 1) {
      const dv = value.slice(-1);
      const numbers = value.slice(0, -1);
      const formatted = numbers.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '-' + dv;
      input.value = formatted;
    } else {
      input.value = value;
    }
  }
}
