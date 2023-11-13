import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleClaseProfesorPage } from './detalle-clase-profesor.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleClaseProfesorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleClaseProfesorPageRoutingModule {}
