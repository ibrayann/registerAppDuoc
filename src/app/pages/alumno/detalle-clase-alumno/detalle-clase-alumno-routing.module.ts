import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleClaseAlumnoPage } from './detalle-clase-alumno.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleClaseAlumnoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleClaseAlumnoPageRoutingModule {}
