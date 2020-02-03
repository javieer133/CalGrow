import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SemanasCocechaComponent } from './semanas-cocecha.component';

describe('SemanasCocechaComponent', () => {
  let component: SemanasCocechaComponent;
  let fixture: ComponentFixture<SemanasCocechaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemanasCocechaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemanasCocechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
