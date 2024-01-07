import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {map, Observable, take} from "rxjs";
import {AuthenticationService} from "../services/authentication.service";
import {Injectable} from "@angular/core";

/**
* Angular guard runs before running the code
* Useful to check if route is accessible or not
* This is also a "service"
*/

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private authenticationService: AuthenticationService, private router: Router) {

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        // check if user is logged in or not
        // check if user is authorized or not
        // can be added to app-routing.module file with needed route.
        // listen for latest user value only and unsubscribe.
        return this.authenticationService.userSubject.pipe(take(1),map(user => {
            if(!user) {
                // this.router.navigate(['/auth']);
                return this.router.createUrlTree(['/auth']);
            }
            return true;
        }));
    }
}
