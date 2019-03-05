import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmslogComponent } from './smslog.component';

describe('SmslogComponent', () => {
  let component: SmslogComponent;
  let fixture: ComponentFixture<SmslogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmslogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmslogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
