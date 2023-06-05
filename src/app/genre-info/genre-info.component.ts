import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GetGenreService } from '../fetch-api-data.service';

@Component({
  selector: 'app-genre-info',
  templateUrl: './genre-info.component.html',
  styleUrls: ['./genre-info.component.scss']
})
export class GenreInfoComponent implements OnInit {

  genreDetails: any = {};

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
    },
    public fetchGenreDetails: GetGenreService,
  ) {}

  /* Genre: string = ''; */

  ngOnInit(): void {
    this.fetchGenreDetails.getGenre(this.data.Name).subscribe((resp: any) => {
      console.log("Genre API Response: ", resp);
      this.genreDetails = resp;
      console.log("User Profile Res: ", this.genreDetails);
      return this.genreDetails;
    })
  }
}
