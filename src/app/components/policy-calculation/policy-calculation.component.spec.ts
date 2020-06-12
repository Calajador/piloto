import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyCalculationComponent } from './policy-calculation.component';

describe('PolicyCalculationComponent', () => {
  let component: PolicyCalculationComponent;
  let fixture: ComponentFixture<PolicyCalculationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyCalculationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
