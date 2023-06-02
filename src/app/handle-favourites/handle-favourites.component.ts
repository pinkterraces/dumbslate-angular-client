import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddFavouriteService } from '../fetch-api-data.service';

@Component({
  selector: 'app-handle-favourites',
  templateUrl: './handle-favourites.component.html',
  styleUrls: ['./handle-favourites.component.scss']
})
export class HandleFavouritesComponent implements OnInit {

  favourites: any = {};

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Id: string;
    },
    public fetchApiData: AddFavouriteService,
  ) {}

  /* Genre: string = ''; */

  ngOnInit(): void {
    this.fetchApiData.addFavourite(this.data.Id).subscribe((resp: any) => {
      console.log("Genre API Response: ", resp);
      console.log("this.data.Id: ", this.data.Id);
      this.favourites = resp;
      console.log("User Profile Res: ", this.favourites);
      return this.favourites;
    })
  }

}
