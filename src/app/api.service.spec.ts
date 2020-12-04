import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  const mockData = {
    mockLists: [
      {
        id: 1,
        name: 'List1',
        completed: 5,
        total: 10,
      },
      {
        id: 2,
        name: 'List2',
        completed: 5,
        total: 10,
      },
    ],
    mockItems: [
      {
        id: 1,
        name: 'item1',
        isDone: false,
        listId: 1,
      },
    ],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiService],
      imports: [HttpClientTestingModule],
    });

    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ApiService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the Observable of data when getLists$ is called', () => {
    service.getLists$().subscribe((list) => expect(list[0].id).toEqual(1));

    const req = httpMock.expectOne('http://localhost:3000/lists');

    expect(req.request.method).toEqual('GET');

    req.flush(mockData.mockLists);
  });

  it('should return the Observable of data when createList$ is called', () => {
    service.createList$({ name: 'List2' }).subscribe((list) => expect(list.name).toEqual('List2'));

    const req = httpMock.expectOne('http://localhost:3000/lists');

    expect(req.request.method).toEqual('POST');

    req.flush(mockData.mockLists[1]);
  });

  it('should return the Observable of data when deleteList$ is called', () => {
    const deletedList = {
      id: 2,
      name: 'List2',
      completed: 5,
      total: 10,
    };

    service.deleteList$(deletedList).subscribe();

    const req = httpMock.expectOne(`http://localhost:3000/lists/${deletedList.id}`);

    expect(req.request.method).toEqual('DELETE');

    req.flush(deletedList);
  });

  it('should return the Observable of data when putList$ is called', () => {
    const modifiedList = {
      id: 2,
      name: 'List2',
      completed: 5,
      total: 10,
    };

    service.putList$(modifiedList.id, { name: 'List2' }).subscribe((list) => expect(list.id).toEqual(2));

    const req = httpMock.expectOne(`http://localhost:3000/lists/${modifiedList.id}`);

    expect(req.request.method).toEqual('PUT');

    req.flush(modifiedList);
  });

  it('should return the Observable of data when getItems$ is called', () => {
    const mockItems = [{
      id: 1,
      name: 'item1',
      isDone: false,
      listId: 1,
    }];

    service.getItems$('1').subscribe((list) => expect(list[0].id).toEqual(1));

    const req = httpMock.expectOne('http://localhost:3000/items?listId=1');

    expect(req.request.method).toEqual('GET');

    req.flush(mockItems);
  });

  it('should return the Observable of data when createItem$ is called', () => {
    const createdItem = {
      id: 2,
      name: 'item2',
      isDone: false,
      listId: 1,
    };

    service.createItem$('1', { name: 'item2' }).subscribe((item) => expect(item.name).toEqual('item2'));

    const req = httpMock.expectOne('http://localhost:3000/items?listId=1');

    expect(req.request.method).toEqual('POST');

    req.flush(createdItem);
  });

  it('should return the Observable of data when putItem$ is called', () => {
    const changedItem = {
      id: 2,
      name: 'item',
      isDone: false,
      listId: 1,
    };

    service.putItem$(changedItem, { name: 'item' }, `${changedItem.listId}`)
      .subscribe((item) => expect(item.name).toEqual('item'));

    const req = httpMock.expectOne(`http://localhost:3000/items/${changedItem.id}?listId=${changedItem.listId}`);

    expect(req.request.method).toEqual('PUT');

    req.flush(changedItem);
  });

  it('should return the Observable of data when deleteItem$ is called', () => {
    const deletedItem = {
      id: 2,
      name: 'item2',
      isDone: false,
      listId: 1,
    };

    service.deleteItem$(deletedItem).subscribe();

    const req = httpMock.expectOne(`http://localhost:3000/items/${deletedItem.id}`);

    expect(req.request.method).toEqual('DELETE');

    req.flush(deletedItem);
  });

  it('should return the Observable of data when patchItem$ is called', () => {
    const changedItem = {
      id: 2,
      name: 'item',
      isDone: true,
      listId: 1,
    };

    service.patchItem$(changedItem, { isDone: true })
      .subscribe((item) => expect(item.name).toEqual('item'));

    const req = httpMock.expectOne(`http://localhost:3000/items/${changedItem.id}`);

    expect(req.request.method).toEqual('PATCH');

    req.flush(changedItem);
  });
});
