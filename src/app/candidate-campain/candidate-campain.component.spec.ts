import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateCampainComponent } from './candidate-campain.component';

describe('CandidateCampainComponent', () => {
  let component: CandidateCampainComponent;
  let fixture: ComponentFixture<CandidateCampainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateCampainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateCampainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
