import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tela0001Component } from './tela0001.component';

describe('Tela0001Component', () => {
  let component: Tela0001Component;
  let fixture: ComponentFixture<Tela0001Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tela0001Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Tela0001Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
