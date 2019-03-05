import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterReportNewhistoryComponent } from './recruiter-report-newhistory.component';

describe('RecruiterReportNewhistoryComponent', () => {
  let component: RecruiterReportNewhistoryComponent;
  let fixture: ComponentFixture<RecruiterReportNewhistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruiterReportNewhistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterReportNewhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
