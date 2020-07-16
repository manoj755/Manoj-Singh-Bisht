import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateCallReportComponent } from './candidate-call-report.component';

describe('CandidateCallReportComponent', () => {
  let component: CandidateCallReportComponent;
  let fixture: ComponentFixture<CandidateCallReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateCallReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateCallReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
