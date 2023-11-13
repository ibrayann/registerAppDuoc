import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-detalle-clase-alumno',
  templateUrl: './detalle-clase-alumno.page.html',
  styleUrls: ['./detalle-clase-alumno.page.scss'],
})
export class DetalleClaseAlumnoPage implements OnInit {
  clase: any;
  qrData: string = ''; // Datos para generar el código QR

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      const claseParam = params.get('clase');
      if (claseParam) {
        this.clase = JSON.parse(claseParam);

        this.qrData = JSON.stringify(this.clase);
      }
    });
  }

  async generarQRCode() {
    if (this.clase) {
      this.router.navigate(['/scanner']);
    }
  }
}
