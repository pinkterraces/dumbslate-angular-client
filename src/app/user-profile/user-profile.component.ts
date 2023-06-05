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
      //return this.userDetails;
      this.fetchMovies.getAllMovies().subscribe((resp: any) => {
        this.favoriteMovies = resp.filter((m: { _id: any; }) => this.userDetails.FavoriteMovies.indexOf(m._id) >= 0);
        console.log("is it:", this.favoriteMovies);
      });
    })
  }

  updateUserDetails(): void {
    this.updateUserProfile.updateUser(this.userData).subscribe((resp: any) => {
      localStorage.setItem("user", (resp.Username));
      this.userDetails = resp;
    })
  }

  // Cancel  //Go back to main page
  openMovies(): void {
    this.router.navigate(['movies']);
  }

  //Favourites
 /*  getFavourites(): void {
    this.fetchUserProfile.getUser().subscribe((resp: any) => {
      this.favourites = resp.FavoriteMovies;
      console.log(this.favourites);
      return this.favourites;
    });
  }
  isFavorite(id: string): boolean {
    return this.favourites.includes(id);
  }

  openGenreInfoDialog(name: string, description: string): void {
    this.dialog.open(GenreInfoComponent, {
      data: {
        Name: name
      },
      width: '400px',
    });
  }

  openDirectorInfoDialog(name: string, description: string): void {
    this.dialog.open(DirectorInfoComponent, {
      data: {
        Name: name
      },
      width: '400px',
    });
  }
  openMovieInfoDialog(title: string, description: string): void {
    this.dialog.open(MovieInfoComponent, {
      data: {
        Title: title
      },
      width: '400px',
    });
  }

  addFavourite(id: string): void {
    this.fetchAddFavourite.addFavourite(id).subscribe((resp: any) => {
      console.log("Genre API Response: ", resp);
      console.log("id: ", id);
      this.snackBar.open('Movie added to favorites', 'OK', {
        duration: 4000,
      });
      this.ngOnInit();
    })
  } */

  removeFavourite(id: string): void {
    this.fetchRemoveFavourite.removeFavourite(id).subscribe((resp: any) => {
      console.log("Genre API Response: ", resp);
      console.log("id: ", id);
      this.snackBar.open('Movie removed from favorites', 'OK', {
        duration: 4000,
      });
      this.ngOnInit();
    })
  }
  
}