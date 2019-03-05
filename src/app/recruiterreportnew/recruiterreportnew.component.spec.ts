import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterreportnewComponent } from './recruiterreportnew.component';

describe('RecruiterreportnewComponent', () => {
  let component: RecruiterreportnewComponent;
  let fixture: ComponentFixture<RecruiterreportnewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruiterreportnewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterreportnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
