import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrecimientoFechaComponent } from './crecimiento-fecha.component';

describe('CrecimientoFechaComponent', () => {
  let component: CrecimientoFechaComponent;
  let fixture: ComponentFixture<CrecimientoFechaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrecimientoFechaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrecimientoFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
