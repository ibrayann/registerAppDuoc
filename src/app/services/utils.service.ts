import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  LoadingController,
  ToastController,
  ToastOptions,
} from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  loadingCtr = inject(LoadingController);
  toastCtr = inject(ToastController);
  router = inject(Router);

  loading() {
    return this.loadingCtr.create({
      message: 'Porfavor espera...',
      spinner: 'lines',
      duration: 2000,
    });
  }

  async presentToast(opt?: ToastOptions) {
    const toast = await this.toastCtr.create(opt);
    toast.present();
  }

  routerLink(path: string) {
    return this.router.navigateByUrl(path);
  }

  saveInLocalStorage(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  getFromLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }
}
