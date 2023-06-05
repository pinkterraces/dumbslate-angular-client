import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GetMovieService } from '../fetch-api-data.service';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.scss']
})
export class MovieInfoComponent implements OnInit {

  movieDetails: any = {};

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Title: string;
    },
    public fetchMovieDetails: GetMovieService,
  ) {}

  ngOnInit(): void {
    this.fetchMovieDetails.getMovie(this.data.Title).subscribe((resp: any) => {
      console.log("Genre API Response: ", resp);
      this.movieDetails = resp;
      console.log("User Profile Res: ", this.movieDetails);
      return this.movieDetails;
    })
  }
}
