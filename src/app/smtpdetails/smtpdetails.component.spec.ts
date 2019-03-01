import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmtpdetailsComponent } from './smtpdetails.component';

describe('SmtpdetailsComponent', () => {
  let component: SmtpdetailsComponent;
  let fixture: ComponentFixture<SmtpdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmtpdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmtpdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
