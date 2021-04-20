import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tela0005Component } from './tela0005.component';

describe('Tela0005Component', () => {
  let component: Tela0005Component;
  let fixture: ComponentFixture<Tela0005Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tela0005Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Tela0005Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
