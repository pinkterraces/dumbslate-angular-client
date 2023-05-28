import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

// Closes the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// Brings in the API calls we created in 6.2
import { UserLoginService } from '../fetch-api-data.service';

// Displays notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: UserLoginService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  // This is the function responsible for sending the form inputs to the backend
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      this.dialogRef.close(); // This will close the modal on success!
      localStorage.setItem("user", (result.user.Username)); //key value pair
      localStorage.setItem("token", result.token);
      console.log(result)
      console.log("User: ", result.user)
      console.log("Token: ", result.token)
      this.snackBar.open('User Login Successful', 'OK', {
        duration: 2000
      });
      this.router.navigate(['movies']);
    }, (result) => {
      this.snackBar.open('User Login Failed', 'OK', {
        duration: 2000
      });
    });
  }

}