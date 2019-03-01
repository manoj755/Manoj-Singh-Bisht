import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientReportFullComponent } from './client-report-full.component';

describe('ClientReportFullComponent', () => {
  let component: ClientReportFullComponent;
  let fixture: ComponentFixture<ClientReportFullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientReportFullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientReportFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
