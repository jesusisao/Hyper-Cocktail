import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SubmenuTodoListComponent } from './submenu-todo-list.component';
import { Router } from '@angular/router';

describe('SubmenuTodoListComponent', () => {
  let component: SubmenuTodoListComponent;
  let fixture: ComponentFixture<SubmenuTodoListComponent>;
  let routerStub;

  beforeEach(async(() => {
    routerStub = {
      navigate: jasmine.createSpy('navigate')
    };
    TestBed.configureTestingModule({
      declarations: [ SubmenuTodoListComponent ],
      providers: [
        { provide: Router, useValue: routerStub },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmenuTodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
