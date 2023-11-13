import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleClaseProfesorPage } from './detalle-clase-profesor.page';

describe('DetalleClaseProfesorPage', () => {
  let component: DetalleClaseProfesorPage;
  let fixture: ComponentFixture<DetalleClaseProfesorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetalleClaseProfesorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
