import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-home-alumno',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  clasesHoy: any[]; // Inicializamos el array vacío
  nombreUsuario: string; // Variable para el nombre de usuario
  asistencia: any[];

  constructor(private router: Router) {
    // Ejemplo de cómo podrías obtener las clases programadas para hoy
    this.clasesHoy = this.obtenerClasesProgramadas();

    // Ejemplo de cómo podrías obtener el nombre de usuario (reemplaza esto con tu lógica real)
    const { name } = JSON.parse(localStorage.getItem('user'));
    this.nombreUsuario = name; // Reemplaza con el nombre real del usuario
    this.clases(
      'users/' + JSON.parse(localStorage.getItem('user')).uid + '/' + 'Lenguaje'
    );
  }

  recargarPagina() {
    window.location.reload();
  }

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  ionViewWillEnter() {}

  obtenerClasesProgramadas() {
    // Simulamos datos ficticios de clases programadas para hoy
    // Debes adaptar esto a tu fuente de datos real
    return [
      {
        asignatura: 'Matemáticas',
        horaInicio: '09:00 AM',
        horaFin: '10:30 AM',
        fecha: this.obtenerFechaActual(),
        alumnos: 25,
        profesorJefe: 'Juan Pérez',
      },
      {
        asignatura: 'Historia',
        horaInicio: '11:00 AM',
        horaFin: '12:30 PM',
        fecha: this.obtenerFechaActual(),
        alumnos: 30,
        profesorJefe: 'María Gómez',
      },
      {
        asignatura: 'Ciencias',
        horaInicio: '02:00 PM',
        horaFin: '03:30 PM',
        fecha: this.obtenerFechaActual(),
        alumnos: 20,
        profesorJefe: 'Carlos Rodríguez',
      },
    ];
  }

  obtenerFechaActual() {
    // Obtén la fecha actual en el formato deseado (puedes personalizarlo)
    const fechaActual = new Date();
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth() + 1; // Sumar 1 ya que enero es 0
    const año = fechaActual.getFullYear();
    const hora = fechaActual.getHours();
    const minutos = fechaActual.getMinutes();

    // Formatea la fecha y hora como desees
    const fechaFormateada = `${dia}/${mes}/${año}`;
    const horaFormateada = `${hora}:${minutos}`;

    return `${fechaFormateada} ${horaFormateada}`;
  }
  verDetalleClase(clase: any) {
    this.router.navigate([
      '/detalle-clase-alumno',
      { clase: JSON.stringify(clase) },
    ]);
  }

  clases(path) {
    console.log(path);
    let sub = this.firebaseSvc.getAsistencia(path).subscribe({
      next: (res) => {
        this.asistencia = res;
        console.log(this.asistencia);
        sub.unsubscribe();
      },
      error: (err) => {
        console.log(err);
        sub.unsubscribe();
      },
    });
  }

  logout() {
    this.firebaseSvc.salir();
  }
}
