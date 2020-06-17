import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountAdditionalComponent } from './account-additional.component';

describe('AccountAdditionalComponent', () => {
  let component: AccountAdditionalComponent;
  let fixture: ComponentFixture<AccountAdditionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountAdditionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountAdditionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
