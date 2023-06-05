import { Component, OnInit } from '@angular/core';
import { GetAllMoviesService, GetUserService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent implements OnInit {

  movies: any[] = [];
  //userDetails: any[] = [];

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

/*   openUserProfile(): void {
    this.dialog.open(UserProfileComponent, {
      width: '350px'
    });
  } */
}
