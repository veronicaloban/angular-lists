import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { ListInterface } from './list';

describe('ListsServiceService', () => {
  let service;
  const data = [{
    id: 1,
    name: 'First',
    total: 10,
    completed: 5,
  }];
  let listsBehaviorSubj: BehaviorSubject<ListInterface[]>;
  let lists: Observable<ListInterface[]>;
  let dataStore: { lists: ListInterface[] };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = jasmine.createSpyObj('ListServiceService', ['getLists', 'postNewList']);
    service.getLists.and.returnValue(of(data));
    service.postNewList.and.returnValue(of(data));

    listsBehaviorSubj = new BehaviorSubject<ListInterface[]>([]);
    dataStore = { lists: [] };
    lists = listsBehaviorSubj.asObservable();
  });

  it('should get data from the server, push it to the array, and pass it to the observable', () => {
    service.getLists().subscribe((resData: ListInterface): void => {
      dataStore.lists.push(resData);
      listsBehaviorSubj.next(({ ...dataStore }).lists);
    });
    lists.subscribe((res) => expect(res.length).toBe(1));
  });

  it('should post data to the server, push it to the array, and pass it to the observable', () => {
    service.postNewList().subscribe((resData: ListInterface): void => {
      dataStore.lists.push(resData);
      listsBehaviorSubj.next(({ ...dataStore }).lists);
    });
    lists.subscribe((res) => expect(res.length).toBe(1));
  });
});
