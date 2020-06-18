import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryInsuredComponent } from './summary-insured.component';

describe('SummaryInsuredComponent', () => {
  let component: SummaryInsuredComponent;
  let fixture: ComponentFixture<SummaryInsuredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryInsuredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryInsuredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
