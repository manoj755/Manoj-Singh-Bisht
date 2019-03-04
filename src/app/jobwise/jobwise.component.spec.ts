import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobwiseComponent } from './jobwise.component';

describe('JobwiseComponent', () => {
  let component: JobwiseComponent;
  let fixture: ComponentFixture<JobwiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobwiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobwiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
