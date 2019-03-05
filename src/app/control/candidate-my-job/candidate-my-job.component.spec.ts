import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateMyJobComponent } from './candidate-my-job.component';

describe('CandidateMyJobComponent', () => {
  let component: CandidateMyJobComponent;
  let fixture: ComponentFixture<CandidateMyJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateMyJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateMyJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
