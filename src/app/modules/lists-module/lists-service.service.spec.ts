import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ListsServiceService } from './lists-service.service';

describe('ListsServiceService', () => {
  let service: ListsServiceService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListsServiceService],
      imports: [HttpClientTestingModule],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ListsServiceService);
  });

  it('returned Observable should match the right data', () => {
    const mockList = [
      {
        id: 1,
        name: 'Первый',
        total: 2,
        completed: 1,
      },
    ];

    service.getLists$()
      .subscribe((data) => {
        expect(data[0].id).toEqual(1);
        expect(data[0].name).toEqual('Первый');
        expect(data[0].total).toEqual(2);
        expect(data[0].completed).toEqual(1);
      });

    const req = httpTestingController.expectOne(
      'http://localhost:3000/lists',
    );

    req.flush(mockList);
  });
});
