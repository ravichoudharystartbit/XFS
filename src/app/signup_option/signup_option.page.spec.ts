import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupOptionPage } from './signup_option.page';

describe('SignupOptionPage', () => {
  let component: SignupOptionPage;
  let fixture: ComponentFixture<SignupOptionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupOptionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupOptionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
