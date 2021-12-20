import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { <%= classify(name) %>ReqDto } from './<%= dasherize(name) %>-req.dto';
import { <%= classify(name) %>Service } from './<%= dasherize(name) %>.service';

@Component({
  selector: 'app-<%= dasherize(name)%>',
  templateUrl: '<%= dasherize(name) %>.component.html',
  styleUrls: ['<%= dasherize(name) %>.component.scss']
})
export class <%= classify(name)%>Component implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private <%= camelize(name) %>Service: <%= classify(name) %>Service) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  login(formValue: <%= classify(name) %>ReqDto): void {
    this.<%= camelize(name) %>Service.login(formValue).subscribe(
      () => {
        console.log('login successful');
      },
      () => {
        console.log('error during login');
      }
    );
  }
}
