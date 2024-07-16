import {FormGroup} from '@angular/forms';
import {ChangeDetectorRef, Injectable} from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FunctionsUtils {

  time: any;
  map: { [key: string]: number } = {};

  constructor() {
    this.time = '';
  }

  setValueMap(key: string, value: number): void {
    this.map[key] = value;
  }

  getValueMap(key: string): number {
    return this.map[key];
  }

  validarControlsRequeridos(form: FormGroup): boolean {

    for (const control in form.controls ) {
      const obj: any = form.get(control);
      if (obj.invalid) {
        obj.markAsTouched();
        return true;
      }
    }

    return false;
  }

  getClaseControlRequerido(form: FormGroup, control: string): string {
    if (form.get(control)?.touched && form.get(control)?.hasError('required')){
      return 'form-control ng-pristine  ng-touched is-invalid';
    }
    return '';
  }

  mostrarAlerta(form: FormGroup, control: string): boolean{
    if (form.get(control)?.touched && form.get(control)?.hasError('required')) {
      return true;
    } else if (form.get(control)?.touched && form.get(control)?.hasError('minlength')) {
      return true;
    } else if (form.get(control)?.touched && form.get(control)?.hasError('email')) {
      return true;
    }
    return false;
  }

  mostrarMensajeAlerta(form: FormGroup, control: string, nombreCampo: string, valorMinimo: string): string{
    if (form.get(control)?.touched && form.get(control)?.hasError('required')) {
      return 'Campo ' + nombreCampo + ' requerido';
    } else if (form.get(control)?.touched && form.get(control)?.hasError('minlength')) {
      return 'Valor mínimo requerido de ' + valorMinimo + ' caracteres';
    } else if (form.get(control)?.touched && form.get(control)?.hasError('email')) {
      return 'Correo inválido';
    }
    return '';
  }

  removeLettersDecimals(nameField: string, maxIntegerLength: number, maxDecimalLength: number, form: any): void  {
    if (form.value[nameField]) {
      let newValueInteger = '';
      let newValueDecimal = '';
      let containsPoint = false;
      const value = form.value[nameField];
      const lstCharacters = value.toString().split('');
      for (const character of lstCharacters) {
        if (character.match('[0-9]')) {
          if (!containsPoint) {
            if (newValueInteger.length < maxIntegerLength) {
              newValueInteger += character;
            }
          } else {
            if (newValueDecimal.length < maxDecimalLength) {
              newValueDecimal += character;
            }
          }
        } else if (character === '.') {
          containsPoint = true;
        }
      }
      const finalValue = (newValueInteger && newValueInteger.length > 0 ? newValueInteger : '0') + '.' +
        (newValueDecimal && newValueDecimal.length > 0 ? newValueDecimal : '00');
      if (finalValue) {
        // tslint:disable-next-line:radix
        if (Number.parseFloat(finalValue) && Number.parseFloat(finalValue) > 0) {
          form.get(nameField).setValue(Number.parseFloat(finalValue));
        } else {
          form.get(nameField).setValue('0.00');
        }
      } else {
        form.get(nameField).setValue(null);
      }
    }
  }

  removeLetters(nameField: string, maxIntegerLength: number, form: any): void {
    if (form.value[nameField]) {
      let newValueInteger = '';
      const value = form.value[nameField];
      const lstCharacters = value.toString().split('');
      for (const character of lstCharacters) {
        if (character.match('[0-9]')) {
          if (newValueInteger.length < maxIntegerLength) {
            newValueInteger += character;
          }
        }
      }
      const finalValue = (newValueInteger && newValueInteger.length > 0 ? newValueInteger : '0');
      if (finalValue) {
        // tslint:disable-next-line:radix
        if (Number.parseInt(finalValue) && Number.parseInt(finalValue) > 0) {
          // tslint:disable-next-line:radix
          form.get(nameField).setValue(Number.parseInt(finalValue));
        } else {
          form.get(nameField).setValue('0');
        }
      } else {
        form.get(nameField).setValue(null);
      }
    }
  }

  removeLettersString(nameField: string, maxIntegerLength: number, form: any): void {
    if (form.value[nameField]) {
      let newValueInteger = '';
      const value = form.value[nameField];
      const lstCharacters = value.toString().split('');
      for (const character of lstCharacters) {
        if (character.match('[0-9]')) {
          if (newValueInteger.length < maxIntegerLength) {
            newValueInteger += character;
          }
        }
      }
      const finalValue = (newValueInteger && newValueInteger.length > 0 ? newValueInteger : '0');
      if (finalValue) {
        // tslint:disable-next-line:radix
        if (Number.parseInt(finalValue) && Number.parseInt(finalValue) > 0) {
          // tslint:disable-next-line:radix
          form.get(nameField).setValue(finalValue);
        } else {
          form.get(nameField).setValue('0');
        }
      } else {
        form.get(nameField).setValue(null);
      }
    }
  }

  labelLenghtField(template: any): string {

    const respuesta = String(template.value.length) + '/' + String(template.maxLength);

    return respuesta ;
  }

  removeSpaces(nameControl: string, form: any): void {
    form.get(nameControl).setValue(form.value[nameControl].toString().trim());
  }

  removeSpacesFormControl(formControl: FormControl): void {
    formControl.setValue(formControl.value.toString().trim());
  }

  removeSpacesString(value: string, obj: any, cdr: ChangeDetectorRef): void {
    obj.valor = value.toString().trim();
    cdr.detectChanges();
  }

  mostrarContrasenia(input: string): void {
    const inputObj: any = document.getElementById(input);
    if (inputObj.type === 'password') {
      inputObj.type = 'text';
    } else {
      inputObj.type = 'password';
    }

  }

  navigateOption(router: Router, opcion: string): void {
    router.navigateByUrl(opcion);
  }

  navigateOptionWithNavigationExtras(router: Router, opcion: string, navigationExtras: NavigationExtras): void {
    router.navigate([opcion], navigationExtras);
  }

  campoRequerido(form: FormGroup, name: string, tipo: string): number {
    const value = form.controls[name].value;

    if (value !== null && value !== undefined) {
      const strValue = typeof value === 'number' ? value.toString() : value;

      // Campo requerido
      if (typeof strValue === 'string' && strValue.trim() === "" && form.controls[name].touched && tipo === 'CR') {
        this.setValueMap(name, 1);
        return 1;
      }

      // Email inválido
      if (form.controls[name]?.touched && form.controls[name]?.hasError('email') && tipo === 'EI') {
        this.setValueMap(name, 2);
        return 2;
      }

      // Teléfono inválido
      if (form.controls[name].touched && tipo === 'TI') {
        if((!/^[0-9\s]+$/.test(form.controls[name].value.trim())) || form.controls[name].value.length < 8){
          this.setValueMap(name, 3);
          return 3;
        }
      }

      // Decimal inválido
      const pattern = /^\d{1,4}(\.\d{1,2})?$/;
      if (!pattern.test(value) && tipo === 'DI') {
        this.setValueMap(name, 4);
        return 4;
      }
    }
    return 0;
  }

  campoRequeridoFormControl(formControl: FormControl): number {
    const value = formControl.value;

    if (value !== null && value !== undefined) {
      const strValue = typeof value === 'number' ? value.toString() : value;

      // Campo requerido
      if (typeof strValue === 'string' && strValue.trim() === "" && formControl.touched) {
        return 1;
      }

      // Email inválido
      if (formControl?.touched && formControl?.hasError('email')) {
        return 2;
      }

      // Teléfono inválido
      if (formControl.touched) {
        if ((typeof strValue === 'string' && !/^[0-9\s]+$/.test(strValue.trim())) || (typeof strValue === 'number' && isNaN(strValue))) {
          return 3;
        }
      }

      // Validar decimales, 4 enteros y 2 decimales
      const pattern = /^\d{1,4}(\.\d{1,2})?$/;
      if (!pattern.test(value)) {
        return 4;
      }
    }

    return 0;
  }

  formatPrice(price: number): string {
    // Si el número no tiene decimales, agregar ".00"
    if (price % 1 === 0) {
      return price.toFixed(2);
    }
    // Si tiene un solo decimal, agregar un cero adicional al final
    if (price % 1 === 0.1) {
      return price.toFixed(1) + '0';
    }
    // Si tiene dos decimales, retornar el número tal cual
    return price.toFixed(2);
  }

    parseDateString(dateString: Date): Date {
    // Separar la fecha y la hora
    const [datePart, timePart] = dateString.toString().split(' ');

    // Separar el día, mes y año
    const [day, month, year] = datePart.split('/').map(Number);

    // Separar las horas, minutos y segundos
    const [hours, minutes, seconds] = timePart.split(':').map(Number);

    // Crear un objeto Date con la fecha y hora especificada
    // Los meses en JavaScript son base 0 (enero es 0, febrero es 1, etc.)
    return new Date(year, month - 1, day, hours, minutes, seconds);
  }

  formatDateInTimeZone(date: Date): string {
    const utcDate = new Date(date.toString());

    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'America/Guatemala',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };

    const formattedDate = new Intl.DateTimeFormat('es-GT', options).format(utcDate);

    return formattedDate;
  }


  // const zonedDate = utcToZonedTime(date, guatemalaTimeZone);



}
