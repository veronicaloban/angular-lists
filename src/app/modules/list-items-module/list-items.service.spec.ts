import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { ItemInterface } from './item';

describe('ListItemsService', () => {
  let service;

  const data: ItemInterface[] = [{
    id: 1,
    name: 'Item1',
    isDone: true,
    listId: 5,
  }];

  let itemsBehaviorSubj: BehaviorSubject<ItemInterface[]>;
  let items: Observable<ItemInterface[]>;
  let listsStore: ItemInterface[];

  beforeEach(() => {
    TestBed.configureTestingModule({});

    service = jasmine.createSpyObj('ItemsService', ['getItems$']);
    service.getItems$.and.returnValue(of(data));

    itemsBehaviorSubj = new BehaviorSubject<ItemInterface[]>([]);
    items = itemsBehaviorSubj.asObservable();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get data from the server, push it to the array, and pass it to the observable', () => {
    service.getItems$().subscribe((res: ItemInterface[]) => {
      listsStore = res;
      itemsBehaviorSubj.next(listsStore);
    });

    items.subscribe((res) => expect(res.length).toBe(1));
  });
});
