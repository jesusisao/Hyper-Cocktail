import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmenuTableTestComponent } from './submenu-table-test.component';

describe('SubmenuTableTestComponent', () => {
  let component: SubmenuTableTestComponent;
  let fixture: ComponentFixture<SubmenuTableTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmenuTableTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmenuTableTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
