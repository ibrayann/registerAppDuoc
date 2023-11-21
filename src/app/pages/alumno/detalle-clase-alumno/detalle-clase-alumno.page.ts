import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-detalle-clase-alumno',
  templateUrl: './detalle-clase-alumno.page.html',
  styleUrls: ['./detalle-clase-alumno.page.scss'],
})
export class DetalleClaseAlumnoPage implements OnInit {
  clase: any;
  user: User; // Datos para generar el código QR

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController
  ) {
    const { uid } = JSON.parse(localStorage.getItem('user'));
    this.user = uid;
  }
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  isSupported = false;
  barcodes: any;
  data: any;
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      const claseParam = params.get('clase');
      if (claseParam) {
        this.clase = JSON.parse(claseParam);
        console.log(this.clase);
      }
    });
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }

  limpiarYParsearJSON(cadenaConEscape: string): any {
    // Eliminar los caracteres de escape y espacios innecesarios
    const cadenaLimpia = cadenaConEscape
      .replace(/\\n/g, '')
      .replace(/\\"/g, '"')
      .trim();

    // Parsear la cadena limpia a un objeto JSON
    const objetoJSON = JSON.parse(cadenaLimpia);
    return objetoJSON;
  }

  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    const { barcodes } = await BarcodeScanner.scan();
    console.log(barcodes[0].rawValue);
    this.barcodes = this.limpiarYParsearJSON(barcodes[0].rawValue);
    console.log('Barcode data', this.barcodes);

    this.envioDeDatos(this.barcodes);
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  envioDeDatos(data) {
    console.log(this.user);
    let path = 'users/' + this.user + '/Clases';
    this.firebaseSvc.addAsistencia(path, data).then((res) => {
      console.log('Se guardó correctamente');
    });
  }
}
