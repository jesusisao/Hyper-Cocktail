import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmenuTodoListComponent } from './submenu-todo-list.component';

describe('SubmenuTodoListComponent', () => {
  let component: SubmenuTodoListComponent;
  let fixture: ComponentFixture<SubmenuTodoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmenuTodoListComponent ]
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
