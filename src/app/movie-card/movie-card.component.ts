import { Component, OnInit } from '@angular/core';
import { GetAllMoviesService, GetUserService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
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
  //userDetails: any[] = [];
  message: string = 'Hello from Parent!';

  constructor(
    public fetchMovies: GetAllMoviesService,
    public fetchUserProfile: GetUserService,
    public dialog: MatDialog
  ) { }

  // This is called once the component has been initiated, similar to component did mount
  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchMovies.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    })
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

}
