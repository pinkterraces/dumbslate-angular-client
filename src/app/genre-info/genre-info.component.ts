import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GetGenreService } from '../fetch-api-data.service';

@Component({
  selector: 'app-genre-info',
  templateUrl: './genre-info.component.html',
  styleUrls: ['./genre-info.component.scss']
})

/**
  * Displays movie genre information in overlay
  */ 
export class GenreInfoComponent implements OnInit {

  genreDetails: any = {};

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
    },
    public fetchGenreDetails: GetGenreService,
  ) {}

/**
  * Get movie genre information
  * Calls the getGenre method on the API
  * @params Name is genre name
  */ 
  ngOnInit(): void {
    this.fetchGenreDetails.getGenre(this.data.Name).subscribe((resp: any) => {
      this.genreDetails = resp;
      return this.genreDetails;
    })
  }
}
