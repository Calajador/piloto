import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervenerAllocationComponent } from './intervener-allocation.component';

describe('IntervenerAllocationComponent', () => {
  let component: IntervenerAllocationComponent;
  let fixture: ComponentFixture<IntervenerAllocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntervenerAllocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntervenerAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
