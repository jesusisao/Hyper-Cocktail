import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

import { Router } from '@angular/router';
import { Mainmenu } from '../class/mainmenu';
import { MAINMENUES } from '../class/mainmenues';
import { AngularSplitModule } from 'angular-split';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        AngularSplitModule,
        RouterTestingModule
      ]
    }).compileComponents();
  }));
  it('should create', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
