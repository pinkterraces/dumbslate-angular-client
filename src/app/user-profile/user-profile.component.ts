import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

// Closes the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// Brings in the API calls we created in 6.2
import { GetUserService, UpdateUserService } from '../fetch-api-data.service';

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
    public updateUserProfile: UpdateUserService,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  //On component load executes getUserDetails
  ngOnInit(): void {
    this.getUserDetails();
  }

  //Gets user details to display in profile view
  getUserDetails(): void {
    this.fetchUserProfile.getUser().subscribe((resp: any) => {
      this.userDetails = resp;
      this.userData.Username = this.userDetails.Username;
      this.userData.Password = this.userDetails.Password;
      this.userData.Email = this.userDetails.Email;
      this.userData.Birthdate = this.userDetails.Birthdate?.substring(0, 10);
      return this.userDetails;
    })
  }

  updateUserDetails(): void {
    this.updateUserProfile.updateUser(this.userData).subscribe((resp: any) => {
      localStorage.setItem("user", (resp.Username));
      this.userDetails = resp;
    })
  }

  // Go back to main page
  openMovies(): void {
    this.router.navigate(['movies']);
  }
  
}