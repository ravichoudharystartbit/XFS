import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideocallPage } from './videocall.page';

describe('VideocallPage', () => {
  let component: VideocallPage;
  let fixture: ComponentFixture<VideocallPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideocallPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideocallPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
