import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrecimientoComparadoComponent } from './crecimiento-comparado.component';

describe('CrecimientoComparadoComponent', () => {
  let component: CrecimientoComparadoComponent;
  let fixture: ComponentFixture<CrecimientoComparadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrecimientoComparadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrecimientoComparadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
