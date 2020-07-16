import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateInternaldatabaseComponent } from './candidate-internaldatabase.component';

describe('CandidateInternaldatabaseComponent', () => {
  let component: CandidateInternaldatabaseComponent;
  let fixture: ComponentFixture<CandidateInternaldatabaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateInternaldatabaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateInternaldatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
