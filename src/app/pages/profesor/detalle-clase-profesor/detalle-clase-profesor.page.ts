import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-clase-profesor',
  templateUrl: './detalle-clase-profesor.page.html',
  styleUrls: ['./detalle-clase-profesor.page.scss'],
})
export class DetalleClaseProfesorPage implements OnInit {
  clase: any;
  qrData: string = '';
  listaAlumnos: string[] = [];
  mostrarImagen: boolean = false;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      const claseParam = params.get('clase');
      if (claseParam) {
        this.clase = JSON.parse(claseParam);
        this.qrData = JSON.stringify(this.clase);
        this.mostrarImagen = false;

        this.listaAlumnos = [
          'SEBASTIAN ANINIR LLANCAO',
          'ALDO MIGUEL ARROYO CASTRO',
          'MATIAS NICOLAS BELLO RODRIGUEZ',
          'BENJAMIN ANDRES SEPULVEDA TOLEDO',
          'FELIPE ANDRES VALDEBENITO CABRERA',
        ];
      }
    });
  }

  async generarQRCode() {
    if (this.clase) {
      console.log('abrir cámara para código QR para la clase:');

      this.mostrarImagen = true;
    }
  }
}
