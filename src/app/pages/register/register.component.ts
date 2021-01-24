import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { ConfirmedValidator } from './confirmed.validator';

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

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog
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

  submit() {
    // TODO: Write API call to check if username is available
    let username_is_taken = false;
    if (username_is_taken) { this.openUsernameDialog() }
    else {
      // TODO: Write API call for submitting registration form, and sending welcome email.
      // TODO: Save form values to register service, and pass to confirmation page.
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
