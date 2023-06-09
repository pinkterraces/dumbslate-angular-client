import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Api url for getting data
*/
const apiUrl = 'https://dumbslate.herokuapp.com/';


/**
 * User Endpoints
 */


/**
 *Creates a new service for user registration
  *  Makes the API call for the user registration endpoint.
  * @param userDetails The details entered into the user registration form
  * @returns http POST request
  */
@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  constructor(private http: HttpClient) {
  }
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }
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

/**
 *Creates a new service for user login
  *  Makes the API call for the user login endpoint.
  * @param userDetails The username and password
  * @returns http POST request
  */
@Injectable({
  providedIn: 'root'
})
export class UserLoginService {
  constructor(private http: HttpClient) {
  }
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }
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

/**
 *Creates a new service for update user
  *  Makes the API call for the user endpoint.
  * @param userDetails The new user details entered into the form on profile component
  * @returns http PUT request
  */
@Injectable({
  providedIn: 'root'
})
export class UpdateUserService {
  constructor(private http: HttpClient) {
  }
  public updateUser(userDetails: any): Observable<any> {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/' + user, userDetails, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }
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

/**
 *Creates a new service for remove user
  *  Makes the API call for the user endpoint.
  * @param userDetails The username
  * @returns http DELETE request
  */
@Injectable({
  providedIn: 'root'
})
export class DeleteUserService {
  constructor(private http: HttpClient) {
  }
  public deleteUser(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.delete(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }
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

/**
 *Creates a new service for getting a single user
  *  Makes the API call for the movies endpoint.
  * @returns http GET request
  */
@Injectable({
  providedIn: 'root'
})
export class GetUserService {

  constructor(private http: HttpClient) {
  }
  public getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    console.log("user: ", user);
    return this.http.get(apiUrl + 'users/' + user, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  private extractResponseData(res: Response | Object): any {
    const body = res;
    console.log("body: ", body);
    return body || {};
  }
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

/**
 * Movie Endpoints
 */

/**
 *Creates a new service for getting all movies
  *  Makes the API call for the movies endpoint.
  * @returns http GET request
  */
@Injectable({
  providedIn: 'root'
})
export class GetAllMoviesService {
  constructor(private http: HttpClient) {
  }
  public getAllMovies(): Observable<any> {
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
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }
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

/**
 *Creates a new service for getting one movie
  *  Makes the API call for the movies endpoint.
  * @param title The movie title
  * @returns http GET request
  */
@Injectable({
  providedIn: 'root'
})
export class GetMovieService {
  constructor(private http: HttpClient) {
  }
  public getMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + title, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }
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

/**
 *Creates a new service for getting movie genre
  *  Makes the API call for the movies/genre endpoint.
  * @param genreName The movie genre
  * @returns http GET request
  */
@Injectable({
  providedIn: 'root'
})
export class GetGenreService {
  constructor(private http: HttpClient) {
  }
  public getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genre/' + genreName, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }
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

/**
 *Creates a new service for getting movie director info
  *  Makes the API call for the movies/directors endpoint.
  * @param director The movie director name
  * @returns http GET request
  */
@Injectable({
  providedIn: 'root'
})
export class GetDirectorService {
  constructor(private http: HttpClient) {
  }
  public getDirector(director: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/directors/' + director, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }
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

/**
 * User /Movie Endpoints
 */

/**
 *Creates a new service for getting user favourite movies
  *  Makes the API call for the users endpoint.
  * @param movie The movie ID
  * @param userName The username
  * @returns http GET request
  */
@Injectable({
  providedIn: 'root'
})
export class GetUserFavouritesService {
  constructor(private http: HttpClient) {
  }
  public getFavourites(movie: any, userName: any): Observable<any> {
    console.log(userName, movie);
    return this.http.get(apiUrl + 'users/' + userName + '/movies').pipe(
      catchError(this.handleError)
    );
  }
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

/**
 *Creates a new service for adding a movie to user favourite movies
  *  Makes the API call for the users/user/movies endpoint.
  * Uses local storage to get username.
  * @param movieId The movie ID
  * @returns http POST request
  */
@Injectable({
  providedIn: 'root'
})
export class AddFavouriteService {
  constructor(private http: HttpClient) {
  }
  public addFavourite(movieId: any): Observable<any> {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    ///users/:Username/movies/:MovieID
    return this.http.post(apiUrl + 'users/' + user + '/movies/' + movieId, null, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }), responseType: 'text'
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
      //Thanks ChatGPT for the next 2 lines
    } else if (error.status === 200 && error.error && error.error.text) {
      // Successful response with additional information
      console.log('Success:', error.error.text);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${JSON.stringify(error.error)}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}

/**
 *Creates a new service for removing a movie to user favourite movies
  *  Makes the API call for the users/user/movies endpoint.
  * Uses local storage to get username.
  * @param movieId The movie ID
  * @returns http DELETE request
  */
@Injectable({
  providedIn: 'root'
})
export class RemoveFavouriteService {
  constructor(private http: HttpClient) {
  }
  public removeFavourite(movieId: any): Observable<any> {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    ///users/:Username/movies/:MovieID
    return this.http.delete(apiUrl + 'users/' + user + '/movies/' + movieId, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else if (error.status === 200 && error.error && error.error.text) {
      console.log('Success:', error.error.text);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${JSON.stringify(error.error)}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}