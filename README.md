# @schematics/ms

## Requirements

- [@angular/cli](https://www.npmjs.com/package/@angular/cli)
- [NodeJS](https://nodejs.org/it/)
- [npm](https://www.npmjs.com/)

## What it is

This repo is about a schematic that generates boilerplate code for login, password recovery and password reset.

## Why it is useful

It provides a straigthforward generation of plain login in angular with all the components and routing needed. There is also the possibility to decide what background color you want for your login page.

## Installation

Be sure to have globally installed the `@angular/cli` library otherwise there is no `ng generate` at your disposal :disappointed:.
If not then

```
npm i -g @angular/cli
```

When you have the `@angular/cli` installed then

```
npm install @schematics/ms
```

## Utilization

This is very simple

```
ng generate @schematics/ms:@login --path=<path to where you want the login boilerplate code>
```

when you succeed the terminal have printed out something like

```
CREATE src/app/login/new-password-req.dto.ts (90 bytes)
CREATE src/app/login/login-req.dto.ts (73 bytes)
CREATE src/app/login/login.component.html (1526 bytes)
CREATE src/app/login/login.component.scss (332 bytes)
CREATE src/app/login/login.component.ts (911 bytes)
CREATE src/app/login/login.module.ts (1545 bytes)
CREATE src/app/login/login.service.ts (1484 bytes)
CREATE src/app/login/login-new-password/login-new-password.component.html (2565 bytes)
CREATE src/app/login/login-new-password/login-new-password.component.scss (124 bytes)
CREATE src/app/login/login-new-password/login-new-password.component.ts (2059 bytes)
CREATE src/app/login/login-new-password/password-strength.validators.ts (739 bytes)
CREATE src/app/login/login-reset-password/login-reset-password.component.html (1012 bytes)
CREATE src/app/login/login-reset-password/login-reset-password.component.scss (91 bytes)
CREATE src/app/login/login-reset-password/login-reset-password.component.ts (869 bytes)
```

> :warning: **The path has to start with src/app**: otherwise the schematic does not find the ngModule and throws an error
