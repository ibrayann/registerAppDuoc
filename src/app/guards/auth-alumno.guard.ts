import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';
import { UtilsService } from '../services/utils.service';

@Injectable({
  providedIn: 'root',
})
export class AuthAlumnoGuard implements CanActivate {
  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return new Promise(async (resolve) => {
      this.firebaseSvc.getAuth().onAuthStateChanged(async (auth) => {
        if (auth) {
          const data = this.utilsSvc.getFromLocalStorage('user');

          if (data.email.includes('duocuc')) {
            resolve(true);
          } else {
            this.utilsSvc.routerLink('/auth');
            resolve(false);
          }
        } else {
          this.utilsSvc.routerLink('/auth');
          resolve(false);
        }
      });
    });
  }
}
