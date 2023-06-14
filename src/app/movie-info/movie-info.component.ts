import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GetMovieService } from '../fetch-api-data.service';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.scss']
})

/** 
 * Gets the information of a single movie
 */  
export class MovieInfoComponent implements OnInit {

  movieDetails: any = {};

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Title: string;
    },
    public fetchMovieDetails: GetMovieService,
  ) {}

/**
  * Gets individual Movie
  * Calls the getMovie method on the API
  * @param Title the the movie title
  * @returns the movie object
  */  
  ngOnInit(): void {
    this.fetchMovieDetails.getMovie(this.data.Title).subscribe((resp: any) => {
      this.movieDetails = resp;
      return this.movieDetails;
    })
  }
}
