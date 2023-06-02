import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandleFavouritesComponent } from './handle-favourites.component';

describe('HandleFavouritesComponent', () => {
  let component: HandleFavouritesComponent;
  let fixture: ComponentFixture<HandleFavouritesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HandleFavouritesComponent]
    });
    fixture = TestBed.createComponent(HandleFavouritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
