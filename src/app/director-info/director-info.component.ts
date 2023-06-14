import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GetDirectorService } from '../fetch-api-data.service';

@Component({
  selector: 'app-director-info',
  templateUrl: './director-info.component.html',
  styleUrls: ['./director-info.component.scss']
})

/**
  * Creates director info overlay
  */ 
export class DirectorInfoComponent {

  directorDetails: any = {};

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
    },
    public fetchDirectorDetails: GetDirectorService,
  ) {}

/**
  * Gets director information
  * Calls the getDirector method on the API
  * @params Name is director name
  */ 
  ngOnInit(): void {
    this.fetchDirectorDetails.getDirector(this.data.Name).subscribe((resp: any) => {
      this.directorDetails = resp;
      return this.directorDetails;
    })
  }
}
