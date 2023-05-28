import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss']
})
export class MainNavigationComponent {

  constructor(
    public dialog: MatDialog
  ) { }

  openUserProfile(): void {
    this.dialog.open(UserProfileComponent, {
      width: '350px'
    });
  }

  logOut(): void {
    this.dialog.open(UserProfileComponent, {
      width: '350px'
    });
  }

}
