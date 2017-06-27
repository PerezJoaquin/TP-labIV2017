import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpantComponent } from './opant.component';

describe('OpantComponent', () => {
  let component: OpantComponent;
  let fixture: ComponentFixture<OpantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
