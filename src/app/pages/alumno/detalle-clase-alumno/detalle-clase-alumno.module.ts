import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleClaseAlumnoPageRoutingModule } from './detalle-clase-alumno-routing.module';

import { DetalleClaseAlumnoPage } from './detalle-clase-alumno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleClaseAlumnoPageRoutingModule
  ],
  declarations: [DetalleClaseAlumnoPage]
})
export class DetalleClaseAlumnoPageModule {}
