import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcentrixCallComponent } from './concentrix-call.component';

describe('ConcentrixCallComponent', () => {
  let component: ConcentrixCallComponent;
  let fixture: ComponentFixture<ConcentrixCallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcentrixCallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcentrixCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
