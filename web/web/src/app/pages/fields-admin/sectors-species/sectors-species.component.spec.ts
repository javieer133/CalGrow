import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorsSpeciesComponent } from './sectors-species.component';

describe('SectorsSpeciesComponent', () => {
  let component: SectorsSpeciesComponent;
  let fixture: ComponentFixture<SectorsSpeciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectorsSpeciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectorsSpeciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
