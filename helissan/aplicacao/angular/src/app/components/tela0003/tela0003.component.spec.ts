import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tela0003Component } from './tela0003.component';

describe('Tela0003Component', () => {
  let component: Tela0003Component;
  let fixture: ComponentFixture<Tela0003Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tela0003Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Tela0003Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
