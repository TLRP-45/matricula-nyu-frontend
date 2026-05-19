import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function rutValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    const cleanRut = value.replace(/\./g, '').replace(/-/g, '');
    
    if (cleanRut.length < 2) return { rutInvalid: true };

    const body = cleanRut.slice(0, -1);
    const cdRelativo = cleanRut.slice(-1).toUpperCase();

    let add = 0;
    let multiply = 2;

    for (let i = 1; i <= body.length; i++) {
      const index = multiply * parseInt(cleanRut.charAt(body.length - i));
      add += index;
      if (multiply < 7) {
        multiply += 1;
      } else {
        multiply = 2;
      }
    }

    const cdExpected = 11 - (add % 11);
    let cd = cdExpected === 11 ? '0' : cdExpected === 10 ? 'K' : cdExpected.toString();

    return cd === cdRelativo ? null : { rutInvalid: true };
  };
}
