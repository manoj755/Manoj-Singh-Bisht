import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalDatabaseComponent } from './internal-database.component';

describe('InternalDatabaseComponent', () => {
  let component: InternalDatabaseComponent;
  let fixture: ComponentFixture<InternalDatabaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternalDatabaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
