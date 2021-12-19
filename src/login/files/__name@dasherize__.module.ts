import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { <%= classify(name) %>Component } from './<%= dasherize(name) %>.component';
import { <%= classify(name) %>ResetPasswordComponent } from './<%= dasherize(name) %>-reset-password/<%= dasherize(name) %>-reset-password.component';
import { <%= classify(name) %>NewPasswordComponent } from './<%= dasherize(name) %>-new-password/<%= dasherize(name) %>-new-password.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

const routes: Routes = [
  { path: '', component: <%= classify(name) %>Component },
  { path: 'reset-password', component: <%= classify(name) %>ResetPasswordComponent },
  { path: 'password-reset/:token', component: <%= classify(name) %>NewPasswordComponent }
];

@NgModule({
  declarations: [<%= classify(name) %>Component, <%= classify(name) %>ResetPasswordComponent, <%= classify(name) %>NewPasswordComponent],
  imports: [
    RouterModule.forChild(routes),
    TranslateModule.forChild(),
    FlexLayoutModule,
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCardModule
  ]
})
export class <%= classify(name) %>Module {}