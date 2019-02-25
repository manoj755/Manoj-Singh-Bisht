import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewTrackerComponent } from './add-new-tracker.component';

describe('AddNewTrackerComponent', () => {
  let component: AddNewTrackerComponent;
  let fixture: ComponentFixture<AddNewTrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewTrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
