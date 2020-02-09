import {AbstractControl, ValidatorFn} from '@angular/forms';

export class CustomValidations {

  static defaultTextPattern = /^[a-zA-Z0-9,\-\s]+$/;

  static matchPatternOrEmpty(pattern: RegExp): ValidatorFn {
    return ((control: AbstractControl): { [key: string]: any } | null => {
        const value = control.value;

        if (value) {
          return pattern.test(value) ? null : {matchPatternOrEmpty: true};
        }

        return null;
      }
    );
  }

  static digitsOnlyOrEmpty(control: AbstractControl): { [key: string]: any } | null {
    const valueAsNumber = +control.value;

    return String(control.value).trim() === '' || isNaN(valueAsNumber) ? {digitsOnlyOrEmpty: true} : null;
  }

  static digitsOnly(control: AbstractControl): { [key: string]: any } | null {
    return control.value === null ? {digitsOnly: true} : null;
  }
}
