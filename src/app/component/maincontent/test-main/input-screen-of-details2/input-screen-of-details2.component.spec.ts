import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { InputScreenOfDetails2Component } from './input-screen-of-details2.component';

describe('InputScreenOfDetails2Component', () => {
  let component: InputScreenOfDetails2Component;
  let fixture: ComponentFixture<InputScreenOfDetails2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputScreenOfDetails2Component ],
      imports: [FormsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputScreenOfDetails2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
