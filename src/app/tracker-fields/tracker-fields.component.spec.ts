import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerFieldsComponent } from './tracker-fields.component';

describe('TrackerFieldsComponent', () => {
  let component: TrackerFieldsComponent;
  let fixture: ComponentFixture<TrackerFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
