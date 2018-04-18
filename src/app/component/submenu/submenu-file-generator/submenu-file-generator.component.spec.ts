import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SubmenuFileGeneratorComponent } from './submenu-file-generator.component';


describe('SubmenuFileGeneratorComponent', () => {
  let component: SubmenuFileGeneratorComponent;
  let fixture: ComponentFixture<SubmenuFileGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubmenuFileGeneratorComponent],
      imports: [RouterTestingModule]
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
