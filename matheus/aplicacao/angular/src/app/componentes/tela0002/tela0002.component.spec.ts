import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tela0002Component } from './tela0002.component';

describe('Tela0002Component', () => {
  let component: Tela0002Component;
  let fixture: ComponentFixture<Tela0002Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tela0002Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Tela0002Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
