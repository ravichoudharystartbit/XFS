import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingCallPage } from './incoming-call.page';

describe('IncomingCallPage', () => {
  let component: IncomingCallPage;
  let fixture: ComponentFixture<IncomingCallPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomingCallPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomingCallPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
