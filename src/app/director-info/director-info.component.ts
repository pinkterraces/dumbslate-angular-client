import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GetDirectorService } from '../fetch-api-data.service';

@Component({
  selector: 'app-director-info',
  templateUrl: './director-info.component.html',
  styleUrls: ['./director-info.component.scss']
})
export class DirectorInfoComponent {

  directorDetails: any = {};

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
    },
    public fetchDirectorDetails: GetDirectorService,
  ) {}

  /* Genre: string = ''; */

  ngOnInit(): void {
    this.fetchDirectorDetails.getDirector(this.data.Name).subscribe((resp: any) => {
      console.log("Director API Response: ", resp);
      this.directorDetails = resp;
      console.log("Director Res: ", this.directorDetails);
      return this.directorDetails;
    })
  }
}
