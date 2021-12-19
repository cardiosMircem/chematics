import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface <%= classify(name) %>ReqDto {
  username: string;
  password: string;
}


@Component({
  selector: 'app-<%= dasherize(name)%>',
  templateUrl: '<%= dasherize(name) %>-list.component.html',
  styleUrls: ['<%= dasherize(name) %>-list.component.scss']
})
export class <%= classify(name)%>Component implements OnInit, OnDestroy {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private <%= dasherize(name) %>Service: <%= classify(name) %>Service) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  login(formValue: <%= classify(name) %>ReqDto): void {
    this.<%= dasherize(name) %>Service.login(formValue).subscribe(() => {
      alert.apply('login successful')
    }, () => {
      () => {
        alert.apply('error during login')
      }
    });
  } // login


}
