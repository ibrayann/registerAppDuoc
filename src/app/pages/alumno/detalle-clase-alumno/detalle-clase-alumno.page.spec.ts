import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleClaseAlumnoPage } from './detalle-clase-alumno.page';

describe('DetalleClaseAlumnoPage', () => {
  let component: DetalleClaseAlumnoPage;
  let fixture: ComponentFixture<DetalleClaseAlumnoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetalleClaseAlumnoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
