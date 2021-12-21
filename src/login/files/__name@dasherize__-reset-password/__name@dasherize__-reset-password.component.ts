import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { <%= classify(name) %>Service } from '../<%= dasherize(name) %>.service';

@Component({
  selector: 'app-<%= dasherize(name) %>-reset-password',
  templateUrl: '<%= dasherize(name) %>-reset-password.component.html',
  styleUrls: ['<%= dasherize(name) %>-reset-password.component.scss']
})
export class <%= classify(name) %>ResetPasswordComponent {
  mail = this.formBuilder.control(null, [Validators.email, Validators.required]);

  constructor(private formBuilder: FormBuilder, private <%= camelize(name) %>Service: <%= classify(name) %>Service) {}

  /**
   * when this http call subscribes the user should receive an email
   * for resetting the password
   */
  mailHandler(): void {
    this.<%= camelize(name) %>Service.sendResetEmailPassword(this.mail.value).subscribe(() => {
      console.log('mail has been sent');
    },
    () => {
      console.log('error when sending password');
    });
  }
}
