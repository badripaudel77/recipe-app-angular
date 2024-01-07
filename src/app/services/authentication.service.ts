import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {Observable, catchError, throwError, Subject, BehaviorSubject} from "rxjs";
import {tap} from "rxjs/operators";
import {NgForm} from "@angular/forms";
import {AuthResponseDataModel} from "../models/auth-response-data.model";
import {CustomerUserModel} from "../models/customer-user.model";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";

/**
 * Firebase Authentication
 * REF docs : https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
 * Firebase Auth Rest API : https://firebase.google.com/docs/reference/rest/auth
 */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  APP_CONSTANTS = environment;

  FIREBASE_SIGNUP_URL = this.APP_CONSTANTS.FIREBASE_SIGNUP_URL;
  FIREBASE_SIGNIN_URL = this.APP_CONSTANTS.FIREBASE_SIGNIN_URL;
  FIREBASE_AUTH_API_KEY = this.APP_CONSTANTS.FIREBASE_AUTH_API_KEY;

  //userSubject = new Subject<CustomerUserModel>(); // we can emit this when we login or logout etc.

  /**
   * gives access to the previously emitted value even if not subscribed yet.
   * this can be subscribed too
   */
  userSubject = new BehaviorSubject<CustomerUserModel>(null);
  token : string = null;
  private timer : any;

  constructor(private http: HttpClient, private router: Router) {
  }

  signUpUser(authForm: NgForm):Observable<any> {
    let userData = authForm.value;
    const httpParams = new HttpParams().set('key', this.FIREBASE_AUTH_API_KEY);
    return this.http.post<AuthResponseDataModel>(this.FIREBASE_SIGNUP_URL, {
      email: userData.userEmail,
      password: userData.userPassword,
      returnSecureToken: true
    }, { params: httpParams }
    )
     // Tap doens't modify the result
    .pipe(catchError(this.handleError), tap((response:AuthResponseDataModel) => {
      /**
       * expiresIn [in response obj] string    The number of seconds in which the ID token expires, needs to convert to data.
       * new Date().getTime(); current timestamp in milli sec
        */
      this.handleAuthentication(response.email, response.localId, response.idToken, Number(response.expiresIn));
    }));
  }

  signInUser(authForm: NgForm) {
    let userData = authForm.value;
    const httpParams = new HttpParams().set('key', this.FIREBASE_AUTH_API_KEY);
    return this.http.post<AuthResponseDataModel>(this.FIREBASE_SIGNIN_URL, {
      email: userData.userEmail,
      password: userData.userPassword,
      returnSecureToken: true
    }, { params: httpParams }
    ).pipe(catchError(this.handleError), tap((response:AuthResponseDataModel) => {
      /**
       * expiresIn [in response obj] string    The number of seconds in which the ID token expires, needs to convert to data.
       * new Date().getTime(); current timestamp in millisec
       */
      this.handleAuthentication(response.email, response.localId, response.idToken, Number(response.expiresIn));
    }));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    errorMessage = error.error.error.message;
    return throwError(errorMessage);
  }

  private handleAuthentication(email: string, localId: string, idToken: string, seconds: number) {
    const expiresIn = new Date(new Date().getTime() + seconds * 1000);
    const user = new CustomerUserModel(email, localId, idToken, expiresIn);
    /**
     * Let's emit user to those who have subscribed to userSubject of the AuthenticationService.
     * It is an observable, so can be subscribed.
     */
    this.userSubject.next(user);
    this.detectAutoLogout(seconds * 1000);
    // store token to the localstorage
    localStorage.setItem('userData', JSON.stringify(user));
  }

  // check if user is already logged in ? if so , redirect to home page
  detectAutoLogin() {
   const user: { userEmail: string, userId: string, token: string, expiration: string } = JSON.parse(localStorage.getItem('userData'));
   if(!user) {
     return;
   }
   const loadedUser = new CustomerUserModel(user.userEmail, user.userId, user.token, new Date(user.expiration));
   if(loadedUser.userToken) {
     this.userSubject.next(loadedUser);
     this.detectAutoLogout(new Date(loadedUser.expiration).getTime() - new Date().getTime());
     this.router.navigate(['/recipes']);
   }
  }

  detectAutoLogout(expirationMillisec: number) {
    this.timer = setTimeout(() => {
      this.logoutUser();
    }, expirationMillisec);
  }

  logoutUser() {
    this.userSubject.next(null);
    localStorage.clear(); // or, localStorage.removeItem('userData');
    this.router.navigate(['/auth']);
    if(this.timer) {
      clearTimeout(this.timer);
    }
  }
}
