import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { ConfirmedValidator } from './confirmed.validator';

import { AccountService } from '../../services/account.service';

import { User } from '../../models/user';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  user: User;

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public account_service: AccountService,
    public router: Router
  ) { }

  registration_form = this.formBuilder.group({
    name: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirm_password: ['', Validators.required],
  }, { validator: ConfirmedValidator ('password', 'confirm_password') }
  )

  getNameErrorMessage() {
    if (this.registration_form.controls.name.hasError('required')) {
      return 'You must enter a value';
    }
  }

  getUsernameErrorMessage() {
    if (this.registration_form.controls.username.hasError('required')) {
      return 'You must enter a value';
    }
  }

  getEmailErrorMessage() {
    if (this.registration_form.controls.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.registration_form.controls.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.registration_form.controls.password.hasError('required')) {
      return 'You must enter a value';
    }
  }

  getConfirmationPasswordErrorMessage() {
    if (this.registration_form.controls.confirm_password.hasError('required')) {
      return 'You must enter a value';
    }
    return this.registration_form.controls.confirm_password != this.registration_form.controls.password ?'The passwords do not match' : '';
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
]);

  async register() {
    let username_taken = await this.account_service.usernameTaken(this.registration_form.controls.username.value);
    let email_taken = await this.account_service.emailTaken(this.registration_form.controls.email.value);

    if (username_taken.toString() === 'true') { this.openUsernameDialog() }
    else if (email_taken.toString() === 'true') { this.openEmailDialog() }
    else {
      this.user = {
        name: this.registration_form.controls.name.value,
        username: this.registration_form.controls.username.value,
        email: this.registration_form.controls.email.value,
        password: this.registration_form.controls.password.value,
      }
      this.account_service.register(this.user);
      this.openConfirmationDialog();
    }

  }

  openUsernameDialog() {
    const dialogRef = this.dialog.open(UsernameDialog, {
      width: '500px',
      data: { username: this.registration_form.controls.username.value }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.registration_form.controls.username.setValue('');
    });
  }

  openEmailDialog() {
    const dialogRef = this.dialog.open(EmailDialog, {
      width: '500px',
      data: { email: this.registration_form.controls.email.value }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.registration_form.controls.email.setValue('');
    });
  }

  openConfirmationDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      width: '500px',
    });
  }

  matcher = new MyErrorStateMatcher();

}

@Component({
  selector: 'username-dialog',
  templateUrl: 'username-dialog.html',
})
export class UsernameDialog {

  constructor(
    public dialogRef: MatDialogRef<UsernameDialog>,
    @Inject(MAT_DIALOG_DATA) public data) {}

  close(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'email-dialog',
  templateUrl: 'email-dialog.html',
})
export class EmailDialog {

  constructor(
    public dialogRef: MatDialogRef<UsernameDialog>,
    @Inject(MAT_DIALOG_DATA) public data) {}

  close(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'confirmation-dialog',
  templateUrl: 'confirmation-dialog.html',
})
export class ConfirmationDialog {

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialog>,
    @Inject(MAT_DIALOG_DATA) public data,
    public router: Router) {}

  closeConfirmation(): void {
    this.router.navigate(['/']);
    this.dialogRef.close();
  }

}
