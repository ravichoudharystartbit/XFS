import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersionalInfoPage } from './verify_email.page';

describe('PersionalInfoPage', () => {
  let component: PersionalInfoPage;
  let fixture: ComponentFixture<PersionalInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersionalInfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersionalInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
