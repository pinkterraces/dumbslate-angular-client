import { Component, OnInit, Input } from '@angular/core';

// Closes the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// Brings in the API calls we created in 6.2
import { UserRegistrationService } from '../fetch-api-data.service';

// Displays notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})

/**
  *Handles User Registration
  */
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthdate: '' };

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

/**
  * Registers user
  * Calls the userRegistration method on the API
  * @param userData The details provided in registration form
  * @returns success or error message
  */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      this.dialogRef.close(); // This will close the modal on success!
      console.log(result)
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

}