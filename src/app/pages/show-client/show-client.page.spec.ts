import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowClientPage } from './show-client.page';

describe('ShowClientPage', () => {
  let component: ShowClientPage;
  let fixture: ComponentFixture<ShowClientPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowClientPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowClientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
