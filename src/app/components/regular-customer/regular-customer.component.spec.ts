import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularCustomerComponent } from './regular-customer.component';

describe('RegularCustomerComponent', () => {
  let component: RegularCustomerComponent;
  let fixture: ComponentFixture<RegularCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegularCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegularCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
