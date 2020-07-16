import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallConcentrixComponent } from './call-concentrix.component';

describe('CallConcentrixComponent', () => {
  let component: CallConcentrixComponent;
  let fixture: ComponentFixture<CallConcentrixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallConcentrixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallConcentrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
