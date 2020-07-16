import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenEmailSmsReportComponent } from './open-email-sms-report.component';

describe('OpenEmailSmsReportComponent', () => {
  let component: OpenEmailSmsReportComponent;
  let fixture: ComponentFixture<OpenEmailSmsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenEmailSmsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenEmailSmsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
