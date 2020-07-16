import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyHistoryCandidateComponent } from './my-history-candidate.component';

describe('MyHistoryCandidateComponent', () => {
  let component: MyHistoryCandidateComponent;
  let fixture: ComponentFixture<MyHistoryCandidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyHistoryCandidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyHistoryCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
