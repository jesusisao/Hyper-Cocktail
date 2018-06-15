import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { TodolistService } from './todolist.service';

describe('TodolistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [TodolistService],
        imports: [HttpModule],
    });
  });

  it('should be created', inject([TodolistService], (service: TodolistService) => {
    expect(service).toBeTruthy();
  }));
});
