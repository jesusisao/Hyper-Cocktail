import { TestBed, inject } from '@angular/core/testing';
import { HttpClientJsonpModule, HttpBackend, JsonpClientBackend } from '@angular/common/http';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ZipcodeService } from './zipcode.service';
import { JsonpModule } from '@angular/http';

describe('ZipcodeService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ZipcodeService, { provide: JsonpClientBackend, useExisting: HttpBackend }],
      imports: [JsonpModule], // 直で読み込むのが良いことなのか分からない
    });
  });

  it('should be created', inject([ZipcodeService], (service: ZipcodeService) => {
    expect(service).toBeTruthy();
  }));
});
