import { Component, OnInit } from '@angular/core';
import { AddFavouriteService, RemoveFavouriteService, GetAllMoviesService, GetUserService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreInfoComponent } from '../genre-info/genre-info.component';
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { MovieInfoComponent } from '../movie-info/movie-info.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent implements OnInit {

  movies: any[] = [];
  userDetails: any[] = [];
  favourites: any[] = [];
  icon: string = "favorite_border";

  constructor(
    public fetchMovies: GetAllMoviesService,
    public fetchUserProfile: GetUserService,
    public fetchAddFavourite: AddFavouriteService,
    public fetchRemoveFavourite: RemoveFavouriteService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavourites();
  }

/**
  * Calls the get movies method on the API
*/
  getMovies(): void {
    this.fetchMovies.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    })
  }

/**
  * Calls the get user method on the API
  * @returns the favourite movies list in DB
*/
  getFavourites(): void {
    this.fetchUserProfile.getUser().subscribe((resp: any) => {
      this.favourites = resp.FavoriteMovies;
      return this.favourites;
    });
  }

/**
  * Checks if a movie is in user favourites or not
  * @returns the favourite movies list in DB
*/
  isFavorite(id: string): boolean {
    return this.favourites.includes(id);
  }

/**
  * Opens genre modal
  * @params name genre name
  * @params description genre description
*/
  openGenreInfoDialog(name: string, description: string): void {
    this.dialog.open(GenreInfoComponent, {
      data: {
        Name: name
      },
      width: '400px',
    });
  }

/**
  * Opens director modal
  * @params name director name
  * @params description director bio
*/
  openDirectorInfoDialog(name: string, description: string): void {
    this.dialog.open(DirectorInfoComponent, {
      data: {
        Name: name
      },
      width: '400px',
    });
  }

/**
  * Opens movie modal
  * @params name movie title
  * @params description movie description
*/
  openMovieInfoDialog(title: string, description: string): void {
    this.dialog.open(MovieInfoComponent, {
      data: {
        Title: title
      },
      width: '400px',
    });
  }

/**
  * Adds favourite movie to user profile
  * @params id is movie ID
*/
  addFavourite(id: string): void {
    this.fetchAddFavourite.addFavourite(id).subscribe((resp: any) => {
      this.snackBar.open('Movie added to favorites', 'OK', {
        duration: 4000,
      });
      this.ngOnInit();
    })
  }

/**
  * Removes favourite movie to user profile
  * @params id is movie ID
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
