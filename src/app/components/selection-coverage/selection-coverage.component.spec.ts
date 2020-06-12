import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionCoverageComponent } from './selection-coverage.component';

describe('SelectionCoverageComponent', () => {
  let component: SelectionCoverageComponent;
  let fixture: ComponentFixture<SelectionCoverageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionCoverageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionCoverageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
