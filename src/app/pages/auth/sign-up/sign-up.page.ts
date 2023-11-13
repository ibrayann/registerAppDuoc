import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  form = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  ngOnInit() {}

  async submit() {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();
      this.firebaseSvc
        .signUp(this.form.value as User)
        .then(async (res) => {
          await this.firebaseSvc.updateProfile(this.form.value.name);

          const uid = res.user.uid;
          this.form.controls.uid.setValue(uid);

          this.setUserInfo(uid);

          this.utilsSvc.presentToast({
            message: 'Cuenta creada',
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

  async setUserInfo(uid: string) {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();

      const path = `users/${uid}`;
      delete this.form.value.password;

      this.firebaseSvc
        .setDocument(path, this.form.value)
        .then(async (res) => {
          await this.firebaseSvc.updateProfile(this.form.value.name);

          this.utilsSvc.saveInLocalStorage('user', this.form.value);
          if (this.form.value.email.includes('duocuc')) {
            this.utilsSvc.routerLink('/home-alumno');
          } else {
            this.utilsSvc.routerLink('/home-profesor');
          }

          this.utilsSvc.presentToast({
            message: 'Cuenta creada',
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
