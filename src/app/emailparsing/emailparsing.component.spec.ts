import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailparsingComponent } from './emailparsing.component';

describe('EmailparsingComponent', () => {
  let component: EmailparsingComponent;
  let fixture: ComponentFixture<EmailparsingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailparsingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailparsingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
