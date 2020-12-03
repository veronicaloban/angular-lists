import { TestBed } from '@angular/core/testing';
import { of, BehaviorSubject } from 'rxjs';

import { StoreService } from './store.service';
import { ApiService } from './api.service';

import { ListInterface } from './modules/lists-module/list';
import { ItemInterface } from './modules/list-items-module/item';

describe('StoreService', () => {
  let service = jasmine.createSpyObj(
    'StoreService',
    [
      'getLists$',
      'createList$',
      'deleteList$',
      'putList$',
      'getItems$',
      'getListName$',
      'createItem$',
      'deleteItem$',
      'putItem$',
      'patchItem$',
    ],
  );
  const apiService = jasmine.createSpyObj(
    'ApiService',
    [
      'getLists$',
      'createList$',
      'deleteList$',
      'putList$',
      'getItems$',
      'getListName$',
      'createItem$',
      'deleteItem$',
      'putItem$',
      'patchItem$',
    ],
  );

  let listsBehaviorSubj$;
  let itemsBehaviorSubj$;

  let lists$;
  let items$;

  let appStore;

  const mockData = {
    mockLists: [
      {
        id: 1,
        name: 'List1',
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

  const list: ListInterface = {
    id: 2,
    name: 'List2',
    completed: 6,
    total: 8,
  };

  const item: ItemInterface = {
    id: 2,
    name: 'item2',
    isDone: true,
    listId: 1,
  };

  const updatedList: ListInterface = {
    id: 2,
    name: 'Second List',
    completed: 6,
    total: 8,
  };

  const updatedItem: ItemInterface = {
    id: 2,
    name: 'Second Item',
    isDone: false,
    listId: 1,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: ApiService, useValue: apiService }],
    });
    service = TestBed.inject(StoreService);
    apiService.getLists$.and.returnValue(of(mockData.mockLists));
    apiService.createList$.and.returnValue(of(list));
    apiService.deleteList$.and.returnValue(of(list));
    apiService.putList$.and.returnValue(of(updatedList));
    apiService.getItems$.and.returnValue(of(mockData.mockItems));
    apiService.createItem$.and.returnValue(of(item));
    apiService.deleteItem$.and.returnValue(of(item));
    apiService.putItem$.and.returnValue(of(updatedItem));
    apiService.patchItem$.and.returnValue(of(updatedItem));

    appStore = {
      lists: [] as ListInterface[],
      items: [] as ItemInterface[],
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getLists$ method of the apiService, and update the state', () => {
    appStore.lists = [];
    listsBehaviorSubj$ = new BehaviorSubject<ListInterface[]>([]);
    lists$ = listsBehaviorSubj$.asObservable();

    apiService.getLists$().subscribe((res: ListInterface[]) => {
      appStore.lists = res;
      listsBehaviorSubj$.next(appStore.lists);
    });

    lists$.subscribe((res: ListInterface[]) => expect(res.length).toBe(1));
  });

  it('should call createlist$ method of the apiService, and update the state', () => {
    appStore.lists = [];
    listsBehaviorSubj$ = new BehaviorSubject<ListInterface[]>([]);
    lists$ = listsBehaviorSubj$.asObservable();

    apiService.createList$().subscribe((res: ListInterface) => {
      appStore.lists.push(res);
      listsBehaviorSubj$.next(appStore.lists);
    });

    lists$.subscribe((res: ListInterface[]) => expect(res.length).toBe(1));
  });

  it('should call deletelist$ method of the apiService, and update the state', () => {
    appStore.lists = [list];
    listsBehaviorSubj$ = new BehaviorSubject<ListInterface[]>([list]);
    lists$ = listsBehaviorSubj$.asObservable();

    apiService.deleteList$().subscribe(() => {
      appStore.lists = appStore.lists.filter((elem: ListInterface) => elem.id !== list.id);
      listsBehaviorSubj$.next(appStore.lists);
    });

    lists$.subscribe((res: ListInterface[]) => expect(res.length).toBe(0));
  });

  it('should call putlist$ method of the apiService, and update the state', () => {
    appStore.lists = [list];
    listsBehaviorSubj$ = new BehaviorSubject<ListInterface[]>([list]);
    lists$ = listsBehaviorSubj$.asObservable();

    apiService.putList$().subscribe((res: ListInterface) => {
      const listToUpdate = appStore.lists.find((val) => val.id === res.id);

      listToUpdate.name = res.name;
      listsBehaviorSubj$.next(appStore.lists);
    });

    lists$.subscribe((res: ListInterface[]) => expect(res[0].name).toBe('Second List'));
  });

  it('should call getItems$ method of the apiService, and update the state', () => {
    appStore.items = [];
    itemsBehaviorSubj$ = new BehaviorSubject<ItemInterface[]>([]);
    items$ = itemsBehaviorSubj$.asObservable();

    apiService.getItems$().subscribe((res: ItemInterface[]) => {
      appStore.items = res;
      itemsBehaviorSubj$.next(appStore.items);
    });

    items$.subscribe((res: ItemInterface[]) => expect(res.length).toBe(1));
  });

  it('should call createItem$ method of the apiService, and update the state', () => {
    appStore.items = [];
    itemsBehaviorSubj$ = new BehaviorSubject<ItemInterface[]>([]);
    items$ = itemsBehaviorSubj$.asObservable();

    appStore.items = [];
    apiService.createItem$().subscribe((res: ItemInterface) => {
      appStore.items.push(res);
      itemsBehaviorSubj$.next(appStore.items);
    });

    items$.subscribe((res: ItemInterface[]) => expect(res.length).toBe(1));
  });

  it('should call deleteItem$ method of the apiService, and update the state', () => {
    appStore.items = [item];
    itemsBehaviorSubj$ = new BehaviorSubject<ItemInterface[]>([item]);
    items$ = itemsBehaviorSubj$.asObservable();

    apiService.deleteItem$().subscribe(() => {
      appStore.items = appStore.items.filter((elem: ItemInterface) => elem.id !== item.id);
      itemsBehaviorSubj$.next(appStore.items);
    });

    items$.subscribe((res: ItemInterface[]) => expect(res.length).toBe(0));
  });

  it('should call putItem$ method of the apiService, and update the state', () => {
    appStore.items = [item];
    itemsBehaviorSubj$ = new BehaviorSubject<ItemInterface[]>([item]);
    items$ = itemsBehaviorSubj$.asObservable();

    apiService.putItem$().subscribe((res: ItemInterface) => {
      const itemToUpdate = appStore.items.find((val) => val.id === res.id);

      itemToUpdate.name = res.name;
      itemsBehaviorSubj$.next(appStore.items);
    });

    items$.subscribe((res) => expect(res[0].name).toBe('Second Item'));
  });

  it('should call patchItem$ method of the apiService, and update the state', () => {
    appStore.items = [item];
    itemsBehaviorSubj$ = new BehaviorSubject<ItemInterface[]>([item]);
    items$ = itemsBehaviorSubj$.asObservable();

    apiService.patchItem$().subscribe((res: ItemInterface) => {
      const itemToUpdate = appStore.items.find((val) => val.id === res.id);

      itemToUpdate.isDone = res.isDone;
      itemsBehaviorSubj$.next(appStore.items);
    });

    items$.subscribe((res: ItemInterface[]) => expect(res[0].isDone).toBe(false));
  });
});
