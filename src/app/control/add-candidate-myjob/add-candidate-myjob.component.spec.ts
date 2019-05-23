import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCandidateMyjobComponent } from './add-candidate-myjob.component';

describe('AddCandidateMyjobComponent', () => {
  let component: AddCandidateMyjobComponent;
  let fixture: ComponentFixture<AddCandidateMyjobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCandidateMyjobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCandidateMyjobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
