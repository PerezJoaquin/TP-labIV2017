import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricipalComponent } from './pricipal.component';

describe('PricipalComponent', () => {
  let component: PricipalComponent;
  let fixture: ComponentFixture<PricipalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricipalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
