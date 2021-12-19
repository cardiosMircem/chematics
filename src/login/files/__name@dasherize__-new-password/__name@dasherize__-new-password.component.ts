import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { NavigationService } from 'src/@template/services/navigation.service';
import { PasswordStrengthValidator } from './password-strength.validators';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class <%= classify(name) %>NewPasswordComponent implements OnInit, OnDestroy {
  newPasswordFG = new FormGroup({});

  newPasswordFC: FormControl;

  repeatedPasswordFC: FormControl;

  unsub$ = new Subject();

  constructor(
    private authenticationService: AuthenticationService,
    private navigation: NavigationService,
    private router: Router
  ) {
    this.navigation.navigationSettings$.next({
      toolbar: false,
      sidemenu: false,
      sidefilter: false,
      searchbar: false
    });
  }

  ngOnInit(): void {
    this.newPasswordFC = new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(50),
      PasswordStrengthValidator
    ]);
    this.repeatedPasswordFC = new FormControl(null, Validators.required);
    this.newPasswordFG.addControl('newPassword', this.newPasswordFC);
    this.newPasswordFG.addControl('repeatedPassword', this.repeatedPasswordFC);

    // mismatch validation between the 2 forms
    this.repeatedPasswordFC.valueChanges
      .pipe(distinctUntilChanged(), takeUntil(this.unsub$))
      .subscribe((repPwd: string) => {
        if (repPwd !== this.newPasswordFC.value) {
          this.repeatedPasswordFC.setErrors({ mismatch: true });
        }
      });
  }

  newPasswordHandler(): void {
    this.authenticationService
      // eslint-disable-next-line no-restricted-globals
      .postNewPwd(this.newPasswordFG.getRawValue(), location.pathname) // TODO: this function shoul be done better
      .subscribe(() => {
        // with all successfull, redirect to login
        this.router.navigate(['login']);
      });
  } // newPasswordHandler

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  } // ngOnDestroy
}
