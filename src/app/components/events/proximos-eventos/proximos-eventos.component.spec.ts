import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProximosEventosComponent } from './proximos-eventos.component';

describe('ProximosEventosComponent', () => {
  let component: ProximosEventosComponent;
  let fixture: ComponentFixture<ProximosEventosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProximosEventosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProximosEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
