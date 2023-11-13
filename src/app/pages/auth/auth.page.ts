import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  ngOnInit() {}

  async submit() {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();
      this.firebaseSvc
        .signIn(this.form.value as User)
        .then((res) => {
          this.setUserInfo(res.user.uid);
        })
        .catch((err) => {
          this.utilsSvc.presentToast({
            message: err.message,
            duration: 2000,
            color: 'danger',
          });
        })
        .finally(() => {
          loading.dismiss();
        });
    }
  }
  async setUserInfo(uid: string) {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();

      const path = `users/${uid}`;
      delete this.form.value.password;

      this.firebaseSvc
        .getDocument(path)
        .then(async (res) => {
          this.utilsSvc.saveInLocalStorage('user', res);
          if (this.form.value.email.includes('duocuc')) {
            this.utilsSvc.routerLink('/home-alumno');
          } else {
            this.utilsSvc.routerLink('/home-profesor');
          }
          this.utilsSvc.presentToast({
            message: 'Bienvenido!',
            duration: 2000,
            color: 'success',
          });
        })
        .catch((err) => {
          this.utilsSvc.presentToast({
            message: err.message,
            duration: 2000,
            color: 'danger',
          });
        })
        .finally(() => {
          loading.dismiss();
        });
    }
  }
}
