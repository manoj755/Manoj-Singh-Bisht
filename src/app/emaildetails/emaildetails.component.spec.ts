import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmaildetailsComponent } from './emaildetails.component';

describe('EmaildetailsComponent', () => {
  let component: EmaildetailsComponent;
  let fixture: ComponentFixture<EmaildetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmaildetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmaildetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
