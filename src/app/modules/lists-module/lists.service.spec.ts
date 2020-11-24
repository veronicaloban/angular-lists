import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { ListInterface } from './list';

describe('ListsService', () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  let service;
  const data = [{
    id: 1,
    name: 'First',
    total: 10,
    completed: 5,
  }];
  let listsBehaviorSubj: BehaviorSubject<ListInterface[]>;
  let lists: Observable<ListInterface[]>;
  let listsStore: ListInterface[];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    service = jasmine.createSpyObj('ListService', ['getLists$', 'createList$']);
    service.getLists$.and.returnValue(of(data));
    service.createList$.and.returnValue(of(data));

    listsBehaviorSubj = new BehaviorSubject<ListInterface[]>([]);
    listsStore = [];
    lists = listsBehaviorSubj.asObservable();
  });

  it('should get data from the server, push it to the array, and pass it to the observable', () => {
    service.getLists$().subscribe((res: ListInterface[]) => res.forEach((resData: ListInterface) => {
      listsStore.push(resData);
      listsBehaviorSubj.next(listsStore);
    }));

    lists.subscribe((res) => expect(res.length).toBe(1));
  });

  it('should post data to the server, push it to the array, and pass it to the observable', () => {
    service.createList$().subscribe((resData: ListInterface): void => {
      listsStore.push(resData);
      listsBehaviorSubj.next(listsStore);
    });

    lists.subscribe((res) => expect(res.length).toBe(1));
  });
});
