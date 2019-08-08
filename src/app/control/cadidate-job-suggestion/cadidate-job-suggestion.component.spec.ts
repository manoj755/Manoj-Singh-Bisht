import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadidateJobSuggestionComponent } from './cadidate-job-suggestion.component';

describe('CadidateJobSuggestionComponent', () => {
  let component: CadidateJobSuggestionComponent;
  let fixture: ComponentFixture<CadidateJobSuggestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadidateJobSuggestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadidateJobSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
