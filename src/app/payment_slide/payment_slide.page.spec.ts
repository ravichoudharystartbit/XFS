import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentSlidePage } from './payment_slide.page';

describe('PaymentSlidePage', () => {
  let component: PaymentSlidePage;
  let fixture: ComponentFixture<PaymentSlidePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentSlidePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentSlidePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
