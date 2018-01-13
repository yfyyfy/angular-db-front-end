import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputOneditComponent } from './input-onedit.component';

describe('InputOneditComponent', () => {
  let component: InputOneditComponent;
  let fixture: ComponentFixture<InputOneditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputOneditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputOneditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
