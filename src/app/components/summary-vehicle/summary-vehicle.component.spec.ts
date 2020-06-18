import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryVehicleComponent } from './summary-vehicle.component';

describe('SummaryVehicleComponent', () => {
  let component: SummaryVehicleComponent;
  let fixture: ComponentFixture<SummaryVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
