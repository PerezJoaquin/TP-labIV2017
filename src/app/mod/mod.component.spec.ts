import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModComponent } from './mod.component';

describe('ModComponent', () => {
  let component: ModComponent;
  let fixture: ComponentFixture<ModComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
