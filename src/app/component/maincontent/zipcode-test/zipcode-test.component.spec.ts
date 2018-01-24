import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZipcodeTestComponent } from './zipcode-test.component';

describe('ZipcodeTestComponent', () => {
  let component: ZipcodeTestComponent;
  let fixture: ComponentFixture<ZipcodeTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZipcodeTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZipcodeTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
