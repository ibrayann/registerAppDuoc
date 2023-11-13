import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';
import { UtilsService } from '../services/utils.service';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    return new Promise(async (resolve) => {
      this.firebaseSvc.getAuth().onAuthStateChanged(async (auth) => {
        if (!auth) {
          resolve(true); // Usuario no autenticado, se le permite el acceso.
        } else {
          if (auth.email.includes('profesor')) {
            this.utilsSvc.routerLink('/home-profesor');
            resolve(false); // Usuario ya autenticado, redirigido a la página de inicio correspondiente.
          }
          if (auth.email.includes('duocuc')) {
            this.utilsSvc.routerLink('/home-alumno');
            resolve(false); // Usuario ya autenticado, redirigido a la página de inicio correspondiente.
          }
        }
      });
    });
  }
}
