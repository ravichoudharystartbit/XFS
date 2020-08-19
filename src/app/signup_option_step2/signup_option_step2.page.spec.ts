import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupOptionStep2Page } from './signup_option_step2.page';

describe('SignupOptionStep2Page', () => {
  let component: SignupOptionStep2Page;
  let fixture: ComponentFixture<SignupOptionStep2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupOptionStep2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupOptionStep2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
