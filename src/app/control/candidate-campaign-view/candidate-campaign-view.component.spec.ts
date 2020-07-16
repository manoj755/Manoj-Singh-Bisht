import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateCampaignViewComponent } from './candidate-campaign-view.component';

describe('CandidateCampaignViewComponent', () => {
  let component: CandidateCampaignViewComponent;
  let fixture: ComponentFixture<CandidateCampaignViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateCampaignViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateCampaignViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
