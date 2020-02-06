import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigSpecieComponent } from './config-specie.component';

describe('ConfigSpecieComponent', () => {
  let component: ConfigSpecieComponent;
  let fixture: ComponentFixture<ConfigSpecieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigSpecieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigSpecieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
