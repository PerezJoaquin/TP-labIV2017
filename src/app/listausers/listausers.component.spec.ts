import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListausersComponent } from './listausers.component';

describe('ListausersComponent', () => {
  let component: ListausersComponent;
  let fixture: ComponentFixture<ListausersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListausersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListausersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
