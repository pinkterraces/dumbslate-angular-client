import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

//import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss']
})

/**
  * Creates main header navigation component
  */ 
export class MainNavigationComponent {

  constructor(
    public dialog: MatDialog,
    private router: Router
  ) { }

  openUserProfile(): void {
    this.router.navigate(['profile']);
  }

  logOut(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }

}
