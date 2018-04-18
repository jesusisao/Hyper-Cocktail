import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ZipcodeTestComponent } from './zipcode-test.component';
import { ZipcodeService } from '../../../service/zipcode.service';
import { JsonpModule } from '@angular/http';

describe('ZipcodeTestComponent', () => {
  let component: ZipcodeTestComponent;
  let fixture: ComponentFixture<ZipcodeTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ZipcodeTestComponent],
      imports: [FormsModule, JsonpModule],
      providers: [ZipcodeService] // 本当はあまり良くない。スタブを用意するべき。
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZipcodeTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
