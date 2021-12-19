import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NavigationService } from 'src/@template/services/navigation.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { SnackBarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-reset-password-mail',
  templateUrl: './reset-password-mail.component.html',
  styleUrls: ['./reset-password-mail.component.scss']
})
export class <%= classify(name) %>ResetPasswordComponent implements OnInit {
  mailFC: FormControl;

  constructor(
    private authService: AuthenticationService,
    private navigation: NavigationService,
    private snackBar: SnackBarService,
    private translateService: TranslateService
  ) {
    this.navigation.navigationSettings$.next({
      toolbar: false,
      sidemenu: false,
      sidefilter: false,
      searchbar: false
    });
  }

  ngOnInit(): void {
    this.mailFC = new FormControl(null, [Validators.email, Validators.required]);
  }

  /**
   * when this http call subscribes the user should receive an email
   * with the link to click for resetting the password
   */
  mailHandler(): void {
    this.authService.postEmailResetPwd(this.mailFC.value).subscribe(() => {
      this.snackBar.display(
        this.translateService.instant('login.emailSentTitle'),
        this.translateService.instant('login.emailSentText'),
        'success',
        null
      );
    });
  }
}
