import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SubmenuTableTestComponent } from './submenu-table-test.component';
import { Router } from '@angular/router';

describe('SubmenuTableTestComponent', () => {
  let component: SubmenuTableTestComponent;
  let fixture: ComponentFixture<SubmenuTableTestComponent>;
  let routerStub;

  beforeEach(async(() => {
    routerStub = {
      navigate: jasmine.createSpy('navigate')
    };
    TestBed.configureTestingModule({
      declarations: [ SubmenuTableTestComponent ],
      providers: [
        { provide: Router, useValue: routerStub },
      ],
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
