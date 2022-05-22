import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEventosTablaComponent } from './listar-eventos-tabla.component';

describe('ListarEventosTablaComponent', () => {
  let component: ListarEventosTablaComponent;
  let fixture: ComponentFixture<ListarEventosTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarEventosTablaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarEventosTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
