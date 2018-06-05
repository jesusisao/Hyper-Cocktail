import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { InputScreenOfDetailsComponent } from './input-screen-of-details.component';
import { DetailsTableComponent } from '../../../common/details-table/details-table.component';
import { FormsModule } from '@angular/forms';


describe('InputScreenOfDetailsComponent', () => {
  let component: InputScreenOfDetailsComponent;
  let fixture: ComponentFixture<InputScreenOfDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InputScreenOfDetailsComponent],
      imports: [FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
