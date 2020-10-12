import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachProfilePage } from './coachProfile.page';

describe('CoachProfilePage', () => {
  let component: CoachProfilePage;
  let fixture: ComponentFixture<CoachProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoachProfilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
