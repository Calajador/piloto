import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalManagementComponent } from './personal-management.component';

describe('PersonalManagementComponent', () => {
  let component: PersonalManagementComponent;
  let fixture: ComponentFixture<PersonalManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
