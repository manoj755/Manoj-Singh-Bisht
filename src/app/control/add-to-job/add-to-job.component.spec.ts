import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToJobComponent } from './add-to-job.component';

describe('AddToJobComponent', () => {
  let component: AddToJobComponent;
  let fixture: ComponentFixture<AddToJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddToJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
