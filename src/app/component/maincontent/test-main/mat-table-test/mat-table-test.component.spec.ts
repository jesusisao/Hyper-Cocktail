import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatFormFieldModule,
  MatInputModule,
  MatSortModule,
  MatTableModule,
} from '@angular/material';

import { MatTableTestComponent } from './mat-table-test.component';

describe('MatTableTestComponent', () => {
  let component: MatTableTestComponent;
  let fixture: ComponentFixture<MatTableTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MatTableTestComponent],
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatSortModule,
        MatTableModule,
        BrowserAnimationsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatTableTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
