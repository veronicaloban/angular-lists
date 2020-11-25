import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { ListInterface } from './list';

describe('ListsService', () => {
  let service;
  const data = [{
    id: 1,
    name: 'First',
    total: 10,
    completed: 5,
  }];
  const updatedList = {
    id: 1,
    name: 'Second',
    total: 10,
    completed: 5,
  };
  let listsBehaviorSubj: BehaviorSubject<ListInterface[]>;
  let lists: Observable<ListInterface[]>;
  let listsStore: ListInterface[];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = jasmine.createSpyObj('ListService', ['getLists$', 'createList$', 'deleteList$', 'putList$']);
    service.getLists$.and.returnValue(of(data));
    service.createList$.and.returnValue(of(data));
    service.putList$.and.returnValue(of(updatedList));
    service.deleteList$.and.returnValue(of(true));

    listsBehaviorSubj = new BehaviorSubject<ListInterface[]>([]);
    listsStore = [{
      id: 1,
      name: 'First',
      total: 10,
      completed: 5,
    }];
    lists = listsBehaviorSubj.asObservable();
  });

  it('should get data from the server, push it to the array, and pass it to the observable', () => {
    service.getLists$().subscribe((res: ListInterface[]) => res.forEach((resData: ListInterface) => {
      listsStore.push(resData);
      listsBehaviorSubj.next(listsStore);
    }));

    lists.subscribe((res) => expect(res.length).toBe(2));
  });

  it('should post data to the server, push it to the array, and pass it to the observable', () => {
    service.createList$().subscribe((resData: ListInterface): void => {
      listsStore.push(resData);
      listsBehaviorSubj.next(listsStore);
    });

    lists.subscribe((res) => expect(res.length).toBe(2));
  });

  it('should delete a list from the server and array, and pass it to the observable', () => {
    const shouldBeDeleted = data[0];
    service.deleteList$().subscribe(() => {
      const deletedListIndex = listsStore.indexOf(shouldBeDeleted);
      listsStore.splice(deletedListIndex, 1);
      listsBehaviorSubj.next(listsStore);
    });
    lists.subscribe((res) => expect(res.length).toBe(0));
  });

  it('should update a list from the server and array, and pass it to the observable', () => {
    service.putList$().subscribe((resData) => {
      const toBeUpdatedList = listsStore.find((item) => item.id === resData.id);
      const toBeUpdatedListIndex = listsStore.indexOf(toBeUpdatedList);
      listsStore.splice(toBeUpdatedListIndex, 1, resData);
      listsBehaviorSubj.next(listsStore);
    });
    lists.subscribe((res) => expect(res[0].name).toBe('Second'));
  });
});
