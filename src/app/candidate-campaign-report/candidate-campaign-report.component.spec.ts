import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateCampaignReportComponent } from './candidate-campaign-report.component';

describe('CandidateCampaignReportComponent', () => {
  let component: CandidateCampaignReportComponent;
  let fixture: ComponentFixture<CandidateCampaignReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateCampaignReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateCampaignReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
