import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeemailComponent } from './employeeemail.component';

describe('EmployeeemailComponent', () => {
  let component: EmployeeemailComponent;
  let fixture: ComponentFixture<EmployeeemailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeemailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
