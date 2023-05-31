import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

// Closes the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// Brings in the API calls we created in 6.2
import { GetUserService } from '../fetch-api-data.service';

// Displays notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userDetails: any = {};

  @Input() userData = { Username: '', Password: '', Email: '', Birthdate: '' };

  constructor(
    public fetchUserProfile: GetUserService,
    /* public dialogRef: MatDialogRef<UserProfileComponent>, */
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  //On component load executes getUserDetails
  ngOnInit(): void {
    this.getUserDetails();
  }

  //Gets user details to display in profile view
  getUserDetails(): void {
    let user = localStorage.getItem("user"); //key value pair
    console.log("user: ", user);
    this.fetchUserProfile.getUser().subscribe((resp: any) => {
      console.log("API Response: ", resp);
      this.userDetails = resp;
      console.log("User Profile Res: ", this.userDetails);
      this.placeholderUsername = this.userDetails.Username;
      this.placeholderPassword = this.userDetails.Password;
      this.placeholderEmail = this.userDetails.Email;
      this.placeholderBirthdate = this.userDetails.Birthdate?.substring(0, 10);
      console.log("Dynamic Value: ", this.placeholderBirthdate);
      return this.userDetails;
    })
  }

  //Placeholder text for user profile details overlay
  placeholderUsername: string = this.userDetails.Username;
  placeholderPassword: string = this.userDetails.Password;
  placeholderEmail: string = this.userDetails.Email;
  placeholderBirthdate: string = this.userDetails.Birthdate;
  







  // Go back to main page
  openMovies(): void {
    this.router.navigate(['movies']);
  }
  
}