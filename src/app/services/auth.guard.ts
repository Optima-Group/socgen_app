import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from './authentication.service';
import { PermissionCode } from 'app/model/auth';
import { AuthorizationService } from './authorization.service';

/**
 * Decides if a route can be activated.
 */
@Injectable() export class AuthGuard implements CanActivate {

  constructor(
    public authenticationService: AuthenticationService, private router: Router,
    private authorizationService: AuthorizationService
  ) { }

    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): boolean {
      if (this.authenticationService.isAuthenticated()) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }

    // constructor(public authenticationService: AuthenticationService, private router: Router,
    //     private authorizationService:AuthorizationService) { }
    //
    // // public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    //
    // //     if (this.authenticationService.signinSubject.getValue()) {
    // //         // Signed in.
    // //         return true;
    // //     }
    //
    // //     // Stores the attempted URL for redirecting.
    // //     let url: string = state.url;
    // //     this.authenticationService.redirectUrl = url;
    //
    // //     // Not signed in so redirects to signin page.
    // //     this.router.navigate(['/signin']);
    //
    // //     return false;
    // // }
    //
    // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    //
    //     // console.log('canActivate' + JSON.stringify(route.data));
    //     // console.log('canActivate' + JSON.stringify(route.data['auth']));
    //
    //     return this.hasRequiredPermission(route.data['auth']);
    //
    //     //return true;
    // }
    //
    // protected hasRequiredPermission(permissionCode: PermissionCode): boolean {
    //
    //     //return true;
    //
    //     return this.authorizationService.hasPermission(permissionCode);
    //
    //     // if (this.authorizationService.permissions) {
    //     //     if (permissionCode) {
    //     //         return this.authorizationService.hasPermission(permissionCode);
    //     //     } else {
    //     //         return this.authorizationService.hasPermission(null);
    //     //     }
    //     // } else {
    //     //     // // Otherwise, must request permissions from the API first
    //     //     // const promise = new Promise<boolean>((resolve, reject) => {
    //     //     //     this.authorizationService.initializePermissions()
    //     //     //         .then(() => {
    //     //     //             if (authGroup) {
    //     //     //                 resolve(this.authorizationService.hasPermission(authGroup));
    //     //     //            } else {
    //     //     //                 resolve(this.authorizationService.hasPermission(null));
    //     //     //             }
    //     //     //         }).catch(() => {
    //     //     //             resolve(false);
    //     //     //         });
    //     //     // });
    //     //     // return promise;
    //
    //     //     return false;
    //     // }
    // }
}
