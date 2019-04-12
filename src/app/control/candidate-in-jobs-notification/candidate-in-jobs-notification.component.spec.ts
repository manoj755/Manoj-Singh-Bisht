import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateInJobsNotificationComponent } from './candidate-in-jobs-notification.component';

describe('CandidateInJobsNotificationComponent', () => {
  let component: CandidateInJobsNotificationComponent;
  let fixture: ComponentFixture<CandidateInJobsNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateInJobsNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateInJobsNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
