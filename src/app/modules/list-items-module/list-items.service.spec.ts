import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { ItemInterface } from './item';

describe('ListItemsService', () => {
  let service;

  const reseivedData: ItemInterface[] = [{
    id: 2,
    name: 'Item2',
    isDone: true,
    listId: 1,
  }];

  const item: ItemInterface = {
    id: 3,
    name: 'Item3',
    isDone: false,
    listId: 1,
  };

  const itemUpdatedName: ItemInterface = {
    id: 3,
    name: 'Item4',
    isDone: false,
    listId: 1,
  };

  const itemUpdatedIsDone: ItemInterface = {
    id: 3,
    name: 'Item3',
    isDone: true,
    listId: 1,
  };

  let incompletedItemsBehaviorSubj: BehaviorSubject<ItemInterface[]>;
  let completedItemsBehaviorSubj: BehaviorSubject<ItemInterface[]>;
  let incompletedItems$: Observable<ItemInterface[]>;
  let completedItems$: Observable<ItemInterface[]>;
  let itemsStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    service = jasmine.createSpyObj(
      'ItemsService', ['getItems$', 'createItem$', 'deleteItem$', 'putItem$', 'patchItem$'],
    );
    service.getItems$.and.returnValue(of(reseivedData));
    service.createItem$.and.returnValue(of(item));
    service.deleteItem$.and.returnValue(of(item));
    service.putItem$.and.returnValue(of(itemUpdatedName));
    service.patchItem$.and.returnValue(of(itemUpdatedIsDone));

    incompletedItemsBehaviorSubj = new BehaviorSubject<ItemInterface[]>([]);
    completedItemsBehaviorSubj = new BehaviorSubject<ItemInterface[]>([]);

    incompletedItems$ = incompletedItemsBehaviorSubj.asObservable();
    completedItems$ = completedItemsBehaviorSubj.asObservable();

    itemsStore = {
      incompletedItems: [] as ItemInterface[],
      completedItems: [] as ItemInterface[],
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get data from the server, push it to the relevant array, and pass it to the observable', () => {
    service.getItems$().subscribe((res: ItemInterface[]) => {
      itemsStore.incompletedItems = res.filter((itemObj) => itemObj.isDone === false);
      itemsStore.completedItems = res.filter((itemObj) => itemObj.isDone === true);
      incompletedItemsBehaviorSubj.next(itemsStore.incompletedItems);
      completedItemsBehaviorSubj.next(itemsStore.completedItems);
    });

    expect(itemsStore.completedItems.length).toBe(1);
    expect(itemsStore.incompletedItems.length).toBe(0);
  });

  it('should post data to the server, push it to the incompletedItems array, and pass it to the observable', () => {
    service.createItem$().subscribe((res: ItemInterface) => {
      itemsStore.incompletedItems.push(res);
      incompletedItemsBehaviorSubj.next(itemsStore.incompletedItems);
    });

    expect(itemsStore.incompletedItems.length).toBe(1);
  });

  it('should delete data from the server, and update the store', () => {
    itemsStore.incompletedItems.push(item);

    service.deleteItem$().subscribe((res: ItemInterface) => {
      const mergedStoreArray = [...itemsStore.incompletedItems, ...itemsStore.completedItems];
      const deletedItemIndex = mergedStoreArray.indexOf(res);

      mergedStoreArray.splice(deletedItemIndex, 1);
      itemsStore.incompletedItems = mergedStoreArray.filter((itemObj) => itemObj.isDone === false);
      itemsStore.completedItems = mergedStoreArray.filter((itemObj) => itemObj.isDone === true);
      incompletedItemsBehaviorSubj.next(itemsStore.incompletedItems);
      completedItemsBehaviorSubj.next(itemsStore.completedItems);
    });

    expect(itemsStore.incompletedItems.length).toBe(0);
  });

  it('should change the name of the item on the server, and update the store', () => {
    itemsStore.incompletedItems.push(item);

    service.putItem$().subscribe((res: ItemInterface) => {
      const mergedStoreArray = [...itemsStore.incompletedItems, ...itemsStore.completedItems];
      const toBeUpdatedItem = mergedStoreArray.find((itemObj) => itemObj.id === res.id);
      const toBeUpdatedItemIndex = mergedStoreArray.indexOf(toBeUpdatedItem);

      mergedStoreArray.splice(toBeUpdatedItemIndex, 1, res);
      itemsStore.incompletedItems = mergedStoreArray.filter((itemObj) => itemObj.isDone === false);
      itemsStore.completedItems = mergedStoreArray.filter((itemObj) => itemObj.isDone === true);
      incompletedItemsBehaviorSubj.next(itemsStore.incompletedItems);
      completedItemsBehaviorSubj.next(itemsStore.completedItems);
    });

    expect(itemsStore.incompletedItems[0].name).toBe('Item4');
  });

  it('should change the isDone property of the item on the server and update the store', () => {
    itemsStore.incompletedItems.push(item);
    service.patchItem$().subscribe((res: ItemInterface) => {
      const mergedStoreArray = [...itemsStore.incompletedItems, ...itemsStore.completedItems];
      const toBeUpdatedItem = mergedStoreArray.find((itemObj) => itemObj.id === res.id);
      const toBeUpdatedItemIndex = mergedStoreArray.indexOf(toBeUpdatedItem);

      mergedStoreArray.splice(toBeUpdatedItemIndex, 1, res);
      itemsStore.incompletedItems = mergedStoreArray.filter((itemObj) => itemObj.isDone === false);
      itemsStore.completedItems = mergedStoreArray.filter((itemObj) => itemObj.isDone === true);
      incompletedItemsBehaviorSubj.next(itemsStore.incompletedItems);
      completedItemsBehaviorSubj.next(itemsStore.completedItems);
    });

    expect(itemsStore.completedItems.length).toBe(1);
    expect(itemsStore.incompletedItems.length).toBe(0);
  });
});
