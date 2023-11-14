import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-detalle-clase-alumno',
  templateUrl: './detalle-clase-alumno.page.html',
  styleUrls: ['./detalle-clase-alumno.page.scss'],
})
export class DetalleClaseAlumnoPage implements OnInit {
  clase: any;
  qrData: string = ''; // Datos para generar el código QR

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController
  ) {}
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  isSupported = false;
  barcodes: Barcode[] = [];
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      const claseParam = params.get('clase');
      if (claseParam) {
        this.clase = JSON.parse(claseParam);

        this.qrData = JSON.stringify(this.clase);
      }
    });
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }

  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);
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
}
