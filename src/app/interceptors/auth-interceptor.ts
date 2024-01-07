/**
 * https://angular.io/api/common/http/HttpInterceptor
 */
import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from "@angular/common/http";
import {exhaustMap, Observable, take} from "rxjs";
import {AuthenticationService} from "../services/authentication.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private authenticationService: AuthenticationService) {
    }
    /**
     * The take operator ensures that only the first emission from userSubject is considered.
     * This is done to prevent memory leaks and handle the case where the observable
     * completes after emitting one value.
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       return this.authenticationService.userSubject.pipe(
           take(1), exhaustMap((user) => {
               // if no user, just move on.
                 if(!user) {
                     return next.handle(req);
                 }
                // set auth header [user token] for req before sending ...
                const modifiedReq = req.clone({ params : new HttpParams().set('auth', user.userToken)});
                return next.handle(modifiedReq);
           })
       )
    }

}
