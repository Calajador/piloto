import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalDataPersonComponent } from './additional-data-person.component';

describe('AdditionalDataPersonComponent', () => {
  let component: AdditionalDataPersonComponent;
  let fixture: ComponentFixture<AdditionalDataPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionalDataPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalDataPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
