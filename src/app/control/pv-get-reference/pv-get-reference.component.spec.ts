import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PvGetReferenceComponent } from './pv-get-reference.component';

describe('PvGetReferenceComponent', () => {
  let component: PvGetReferenceComponent;
  let fixture: ComponentFixture<PvGetReferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PvGetReferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PvGetReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
