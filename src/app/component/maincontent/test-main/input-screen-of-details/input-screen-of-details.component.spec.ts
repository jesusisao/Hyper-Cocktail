import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InputScreenOfDetailsComponent } from './input-screen-of-details.component';
import { FormsModule } from '@angular/forms';


describe('InputScreenOfDetailsComponent', () => {
  let component: InputScreenOfDetailsComponent;
  let fixture: ComponentFixture<InputScreenOfDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InputScreenOfDetailsComponent],
      imports: [FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputScreenOfDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
