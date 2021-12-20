import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { PasswordStrengthValidator } from './password-strength.validators';
import { <%= classify(name) %>Service } from '../<%= dasherize(name) %>.service';

@Component({
  selector: 'app-<%= dasherize(name) %>-new-password',
  templateUrl: './<%= dasherize(name) %>-new-password.component.html'
})
export class <%= classify(name) %>NewPasswordComponent implements OnInit, OnDestroy {
  get repeatedPasswordControl(): FormControl {
    return this.newPasswordFG.get('repeatedPassword') as FormControl;
  }

  get newPasswordControl(): FormControl {
    return this.newPasswordFG.get('newPassword') as FormControl;
  }

  newPasswordFG = this.formBuilder.group({
    newPassword: [
      null,
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50),
        PasswordStrengthValidator
      ]
    ],
    repeatedPassword: [null, [Validators.required]]
  });

  unsub$ = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private <%= camelize(name) %>Service: <%= classify(name) %>Service,
    private router: Router
  ) {}

  ngOnInit(): void {
    // mismatch validation between the 2 forms
    this.repeatedPasswordControl.valueChanges
      .pipe(distinctUntilChanged(), takeUntil(this.unsub$))
      .subscribe((repPwd: string) => {
        if (repPwd !== this.newPasswordControl.value) {
          this.repeatedPasswordControl.setErrors({ mismatch: true });
        }
      });
  }

  newPasswordHandler(): void {
    this.<%= camelize(name) %>Service.postNewPassword(this.newPasswordFG.getRawValue()).subscribe(() => {
      // with all successfull, redirect to login
      this.router.navigate(['login']);
    },
    () => {
      console.log('error when resetting password');
    });
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }
}
