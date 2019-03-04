import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeningclientwiseComponent } from './openingclientwise.component';

describe('OpeningclientwiseComponent', () => {
  let component: OpeningclientwiseComponent;
  let fixture: ComponentFixture<OpeningclientwiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpeningclientwiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpeningclientwiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
