import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientdepartmentComponent } from './clientdepartment.component';

describe('ClientdepartmentComponent', () => {
  let component: ClientdepartmentComponent;
  let fixture: ComponentFixture<ClientdepartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientdepartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientdepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
