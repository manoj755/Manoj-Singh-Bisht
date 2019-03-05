import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatestatusupdateComponent } from './candidatestatusupdate.component';

describe('CandidatestatusupdateComponent', () => {
  let component: CandidatestatusupdateComponent;
  let fixture: ComponentFixture<CandidatestatusupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidatestatusupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatestatusupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
