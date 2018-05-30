import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SubmenuFileGeneratorComponent } from './submenu-file-generator.component';
import { Router } from '@angular/router';

describe('SubmenuFileGeneratorComponent', () => {
  let component: SubmenuFileGeneratorComponent;
  let fixture: ComponentFixture<SubmenuFileGeneratorComponent>;
  let routerStub;

  beforeEach(async(() => {
    routerStub = {
      navigate: jasmine.createSpy('navigate')
    };
    TestBed.configureTestingModule({
      declarations: [SubmenuFileGeneratorComponent],
      providers: [
        { provide: Router, useValue: routerStub },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmenuFileGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
