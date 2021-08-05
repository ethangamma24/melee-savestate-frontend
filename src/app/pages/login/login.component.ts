import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';

import { AccountService } from '../../services/account.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  password_div = false;
  email_div = false;
  success = false;

  constructor(
    private formBuilder: FormBuilder,
    public account_service: AccountService,
    public router: Router
  ) { }

  login_form = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required]
  });

  getEmailErrorMessage() {
    if (this.login_form.controls.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.login_form.controls.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.login_form.controls.password.hasError('required')) {
      return 'You must enter a value';
    }
  }

  matcher = new MyErrorStateMatcher();

  async login() {
    console.log(this.login_form);
    let login_successful = await this.account_service.login(this.login_form.controls.email.value, this.login_form.controls.password.value);
    if (!login_successful) { this.password_div = true; }
    else if (login_successful === null) { this.email_div = true; }
    else { this.success = true; }
    console.log('logging in');
    await setTimeout(function() {}, 500);
    this.router.navigate(['/']);
  }

}
