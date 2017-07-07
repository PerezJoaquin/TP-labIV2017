import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListalocalesComponent } from './listalocales.component';

describe('ListalocalesComponent', () => {
  let component: ListalocalesComponent;
  let fixture: ComponentFixture<ListalocalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListalocalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListalocalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
