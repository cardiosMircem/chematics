import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { <%= classify(name) %>ReqDto } from './<%= dasherize(name) %>.interface';
import { <%= classify(name) %>Service } from './<%= dasherize(name) %>.service';

@Component({
  selector: 'app-<%= dasherize(name)%>',
  templateUrl: '<%= dasherize(name) %>.component.html',
  styleUrls: ['<%= dasherize(name) %>.component.scss']
})
export class <%= classify(name)%>Component implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private <%= dasherize(name) %>Service: <%= classify(name) %>Service) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  login(formValue: <%= classify(name) %>ReqDto): void {
    this.<%= dasherize(name) %>Service.login(formValue).subscribe(
      () => {
        alert.apply('login successful');
      },
      () => {
        alert.apply('error during login');
      }
    );
  }
}
