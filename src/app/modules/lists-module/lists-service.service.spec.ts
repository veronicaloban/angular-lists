import { TestBed } from '@angular/core/testing';

import { ListsServiceService } from './lists-service.service';

describe('ListsServiceService', () => {
  let service: ListsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
