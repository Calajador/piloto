import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DniSearchComponent } from './dni-search.component';

describe('DniSearchComponent', () => {
  let component: DniSearchComponent;
  let fixture: ComponentFixture<DniSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DniSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DniSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
