import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiInputOneditComponent } from './multi-input-onedit.component';

describe('MultiInputOneditComponent', () => {
  let component: MultiInputOneditComponent;
  let fixture: ComponentFixture<MultiInputOneditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiInputOneditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiInputOneditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
