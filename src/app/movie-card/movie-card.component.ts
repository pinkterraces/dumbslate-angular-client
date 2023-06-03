import { Component, OnInit } from '@angular/core';
import { AddFavouriteService, RemoveFavouriteService, GetAllMoviesService, GetUserService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreInfoComponent } from '../genre-info/genre-info.component';
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { MovieInfoComponent } from '../movie-info/movie-info.component';
import { HandleFavouritesComponent } from '../handle-favourites/handle-favourites.component';

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
  /* iconBorder: string = "favorite_border";
  iconFilled: string = "favorite"; */

  constructor(
    public fetchMovies: GetAllMoviesService,
    public fetchUserProfile: GetUserService,
    public fetchAddFavourite: AddFavouriteService,
    public fetchRemoveFavourite: RemoveFavouriteService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  // This is called once the component has been initiated, similar to component did mount
  ngOnInit(): void {
    this.getMovies();
    this.getFavourites();
  }

  getMovies(): void {
    this.fetchMovies.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    })
  }

  getFavourites(): void {
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
  }

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
