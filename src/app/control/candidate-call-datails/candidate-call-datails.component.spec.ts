import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateCallDatailsComponent } from './candidate-call-datails.component';

describe('CandidateCallDatailsComponent', () => {
  let component: CandidateCallDatailsComponent;
  let fixture: ComponentFixture<CandidateCallDatailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateCallDatailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateCallDatailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
