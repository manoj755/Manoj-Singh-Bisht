import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateInQueueComponent } from './candidate-in-queue.component';

describe('CandidateInQueueComponent', () => {
  let component: CandidateInQueueComponent;
  let fixture: ComponentFixture<CandidateInQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateInQueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateInQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
