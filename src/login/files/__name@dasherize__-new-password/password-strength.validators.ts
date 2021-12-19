import { AbstractControl, ValidationErrors } from '@angular/forms';

// tslint:disable-next-line: variable-name
export const PasswordStrengthValidator = (control: AbstractControl): ValidationErrors | null => {
  const value: string = control.value || '';

  if (!value) {
    return null;
  }

  // eslint-disable-next-line no-useless-escape
  const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  if (specialCharacters.test(value) === false) {
    return { noSpecialChar: true };
  }

  const upperCaseCharacters = /[A-Z]+/g;
  if (upperCaseCharacters.test(value) === false) {
    return { noUpperCase: true };
  }

  const lowerCaseCharacters = /[a-z]+/g;
  if (lowerCaseCharacters.test(value) === false) {
    return { noLowerCase: true };
  }

  return null;
};
