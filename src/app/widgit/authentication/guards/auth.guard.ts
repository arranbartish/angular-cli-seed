import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // TODO
        // check on state if the user is there return true [state.select('userprofile')]
        // otherwise redirect to login and return false
        //  this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return true;
    }
}