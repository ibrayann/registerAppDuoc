import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthAlumnoGuard } from './guards/auth-alumno.guard';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthPageModule),
  },
  {
    path: 'home-profesor',
    loadChildren: () =>
      import('./pages/profesor/home/home.module').then((m) => m.HomePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'home-alumno',
    loadChildren: () =>
      import('./pages/alumno/home/home.module').then((m) => m.HomePageModule),
    canActivate: [AuthAlumnoGuard],
  },
  {
    path: 'detalle-clase-alumno',
    loadChildren: () =>
      import(
        './pages/alumno/detalle-clase-alumno/detalle-clase-alumno.module'
      ).then((m) => m.DetalleClaseAlumnoPageModule),
    canActivate: [AuthAlumnoGuard],
  },
  {
    path: 'detalle-clase-profesor',
    loadChildren: () =>
      import(
        './pages/profesor/detalle-clase-profesor/detalle-clase-profesor.module'
      ).then((m) => m.DetalleClaseProfesorPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'scanner',
    loadChildren: () =>
      import('./pages/alumno/scanner/scanner.module').then(
        (m) => m.ScannerPageModule
      ),
    canActivate: [AuthAlumnoGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
