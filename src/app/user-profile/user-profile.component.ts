import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

// Closes the dialog on success
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

// Brings in the API calls we created in 6.2
import { AddFavouriteService, GetAllMoviesService, GetUserService, RemoveFavouriteService, UpdateUserService } from '../fetch-api-data.service';

// Displays notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
/* import { GenreInfoComponent } from '../genre-info/genre-info.component';
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { MovieInfoComponent } from '../movie-info/movie-info.component'; */


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

/** 
 * Loads the user profile information and allows the user to update their profile information
 */  
export class UserProfileComponent implements OnInit {

  userDetails: any = {};
  favoriteMovies: any[] = [];
  favourites: any[] = [];

  @Input() userData = { Username: '', Password: '', Email: '', Birthdate: '' };

  constructor(
    public fetchUserProfile: GetUserService,
    public updateUserProfile: UpdateUserService,
    public fetchMovies: GetAllMoviesService,
    
    
    public fetchAddFavourite: AddFavouriteService,
    public fetchRemoveFavourite: RemoveFavouriteService,
    public dialog: MatDialog,

    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  /**
  * Executes when components loads
  */
  ngOnInit(): void {
    this.getUserDetails();
  }

  /**
  * Gets user profile information
  * Calls the getUser method on the API
  * @returns the user details
  */
  getUserDetails(): void {
    this.fetchUserProfile.getUser().subscribe((resp: any) => {
      this.userDetails = resp;
      this.userData.Username = this.userDetails.Username;
      this.userData.Password = this.userDetails.Password;
      this.userData.Email = this.userDetails.Email;
      this.userData.Birthdate = this.userDetails.Birthdate?.substring(0, 10);
      //return this.userDetails;
      /**
        * Checks for user faourties
        * @param userDetails the user profile information
        * @param _id the movies ID
        * @returns list of user favourie movies
        */
      this.fetchMovies.getAllMovies().subscribe((resp: any) => {
        this.favoriteMovies = resp.filter((m: { _id: any; }) => this.userDetails.FavoriteMovies.indexOf(m._id) >= 0);
        console.log("is it:", this.favoriteMovies);
      });
    })
  }

  /**
    * Updates user profile information and sets "user" in local storafe
    * Calls the updateUser method on the API
    * @param userData the new user profile information
    * @returns the updated user profile information
    */
  updateUserDetails(): void {
    this.updateUserProfile.updateUser(this.userData).subscribe((resp: any) => {
      localStorage.setItem("user", (resp.Username));
      this.userDetails = resp;
    })
  }

  /**
    * Returns user back to the main page
    */
  openMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
    * Removes favourite from user profile
    * Calls the removeFavourite method on the API
    * @param id the movie ID
    * @returns success message
    */
  removeFavourite(id: string): void {
    this.fetchRemoveFavourite.removeFavourite(id).subscribe((resp: any) => {
      this.snackBar.open('Movie removed from favorites', 'OK', {
        duration: 4000,
      });
      this.ngOnInit();
    })
  }
  
}