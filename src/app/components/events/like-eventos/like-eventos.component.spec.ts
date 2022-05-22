import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikeEventosComponent } from './like-eventos.component';

describe('LikeEventosComponent', () => {
  let component: LikeEventosComponent;
  let fixture: ComponentFixture<LikeEventosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LikeEventosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LikeEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
