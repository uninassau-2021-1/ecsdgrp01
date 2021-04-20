import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tela0004Component } from './tela0004.component';

describe('Tela0004Component', () => {
  let component: Tela0004Component;
  let fixture: ComponentFixture<Tela0004Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tela0004Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Tela0004Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
