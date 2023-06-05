import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators'; //code from CF was rxjs/internal/operators
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://dumbslate.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

  ///User Actions
  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // Making the api call for the user login endpoint
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // Making the api call for the update user endpoint
  updateUser(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.put(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // Making the api call for the delete user endpoint
  deleteUser(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.delete(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // Making the api call for the get single user endpoint
  getUser(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.get(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // Making the api call for the get all users endpoint
  /*   public userGetAll(userDetails: any): Observable<any> {
      console.log(userDetails);
      return this.http.get(apiUrl + 'users', userDetails).pipe(
        catchError(this.handleError)
      );
    } */


  /// Movie Actions
  // Making the api call for getting all movies endpoint
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  // Non-typed response extraction
  private extractResponseData(res: Response): any {
    const body = res;
    return body || {};
  }

  // Making the api call for getting single movie endpoint
  getMovie(title: any): Observable<any> {
    console.log(title);
    return this.http.get(apiUrl + 'movies', title).pipe(
      catchError(this.handleError)
    );
  }

  // Making the api call for getting director info endpoint
  getGenre(genreName: any): Observable<any> {
    console.log(genreName);
    return this.http.get(apiUrl + 'movies' + 'genre', genreName).pipe(
      catchError(this.handleError)
    );
  }

  // Making the api call for getting director info endpoint
  getDirector(director: any): Observable<any> {
    console.log(director);
    return this.http.get(apiUrl + 'movies' + 'directors', director).pipe(
      catchError(this.handleError)
    );
  }

  // UserMovie actions
  // Making the api call for getting favourite movie for a user endpoint
  getFavourites(movie: any, userDetails: any): Observable<any> {
    console.log(movie);
    return this.http.get(apiUrl + 'users' + userDetails + 'movies').pipe(
      catchError(this.handleError)
    );
  }

  // Making the api call for adding favourite movie to user endpoint
  addFavourite(movie: any, userDetails: any): Observable<any> {
    console.log(movie + ', ' + userDetails);
    return this.http.post(apiUrl + 'users' + userDetails + 'movies', movie).pipe(
      catchError(this.handleError)
    );
  }

  // Making the api call for deleting favourite movie to user endpoint
  deleteFavourite(movie: any, userDetails: any): Observable<any> {
    console.log(movie + ', ' + userDetails);
    return this.http.delete(apiUrl + 'users' + userDetails + 'movies', movie).pipe(
      catchError(this.handleError)
    );
  }


  //Error handling
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}