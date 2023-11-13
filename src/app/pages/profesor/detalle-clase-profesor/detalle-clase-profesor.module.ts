import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleClaseProfesorPageRoutingModule } from './detalle-clase-profesor-routing.module';

import { DetalleClaseProfesorPage } from './detalle-clase-profesor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleClaseProfesorPageRoutingModule
  ],
  declarations: [DetalleClaseProfesorPage]
})
export class DetalleClaseProfesorPageModule {}
