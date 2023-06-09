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
// User Endpoints
export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
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

@Injectable({
  providedIn: 'root'
})

export class UserLoginService {
  constructor(private http: HttpClient) {
  }
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
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

@Injectable({
  providedIn: 'root'
})

export class UpdateUserService {
  constructor(private http: HttpClient) {
  }
  public updateUser(userDetails: any): Observable<any> {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    console.log("This", userDetails);
    console.log(apiUrl + 'users/' + user);
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
  // Non-typed response extraction
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
  // Non-typed response extraction
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

  //// old
  /*  constructor(private http: HttpClient) {
   }
   public getUser(userDetails: any): Observable<any> {
     console.log(userDetails);
     return this.http.get(apiUrl + 'users', userDetails).pipe(
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
   } */
}

/// Movie Endpoints
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
  // Non-typed response extraction
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
  // Non-typed response extraction
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
  // Non-typed response extraction
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
  // Non-typed response extraction
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

/// UserMovie Endpoints
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
  // Non-typed response extraction
  private extractResponseData(res: Response | Object): any {
    console.log(res);
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
    // Non-typed response extraction
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