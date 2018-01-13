import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxOneditComponent } from './checkbox-onedit.component';

describe('CheckboxOneditComponent', () => {
  let component: CheckboxOneditComponent;
  let fixture: ComponentFixture<CheckboxOneditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckboxOneditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxOneditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
