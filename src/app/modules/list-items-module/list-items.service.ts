import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ItemInterface } from './item';

@Injectable()
export class ListItemsService {
  private url = `${environment.apiUrl}/items`;
  private incompletedItemsBehaviorSubj = new BehaviorSubject<ItemInterface[]>([]);
  private completedItemsBehaviorSubj = new BehaviorSubject<ItemInterface[]>([]);

  public readonly incompletedItems$ = this.incompletedItemsBehaviorSubj.asObservable();
  public readonly completedItems$ = this.completedItemsBehaviorSubj.asObservable();

  private itemsStore = {
    incompletedItems: [] as ItemInterface[],
    completedItems: [] as ItemInterface[],
  };

  constructor(private http: HttpClient) { }

  public getItems$(listId: string): void {
    this.http.get<ItemInterface[]>(this.url, { params: { listId } }).subscribe((res) => {
      this.itemsStore.incompletedItems = res.filter((item) => item.isDone === false);
      this.itemsStore.completedItems = res.filter((item) => item.isDone === true);
      this.incompletedItemsBehaviorSubj.next(this.itemsStore.incompletedItems);
      this.completedItemsBehaviorSubj.next(this.itemsStore.completedItems);
    });
  }

  public getListName$(listId: string): Observable<string> {
    return this.http.get<string>(`${environment.apiUrl}/list-name`, { params: { listId } });
  }

  public createItem$(listId: string, data: { name: string }): void {
    this.http.post<ItemInterface>(this.url, data, { params: { listId } }).subscribe((resData) => {
      this.itemsStore.incompletedItems.push(resData);
      this.incompletedItemsBehaviorSubj.next(this.itemsStore.incompletedItems);
    });
  }

  public deleteItem$(item: ItemInterface): void {
    this.http.delete<ItemInterface>(`${this.url}/${item.id}`).subscribe(() => {
      const mergedStoreArray = [...this.itemsStore.incompletedItems, ...this.itemsStore.completedItems];
      const deletedItemIndex = mergedStoreArray.indexOf(item);

      mergedStoreArray.splice(deletedItemIndex, 1);
      this.itemsStore.incompletedItems = mergedStoreArray.filter((itemObj) => itemObj.isDone === false);
      this.itemsStore.completedItems = mergedStoreArray.filter((itemObj) => itemObj.isDone === true);
      this.incompletedItemsBehaviorSubj.next(this.itemsStore.incompletedItems);
      this.completedItemsBehaviorSubj.next(this.itemsStore.completedItems);
    });
  }

  public putItem$(item: ItemInterface, data: { name: string }, listId: string): void {
    this.http.put<ItemInterface>(`${this.url}/${item.id}`, data, { params: { listId } }).subscribe((resData) => {
      const mergedStoreArray = [...this.itemsStore.incompletedItems, ...this.itemsStore.completedItems];
      const toBeUpdatedItem = mergedStoreArray.find((itemObj) => itemObj.id === resData.id);
      const toBeUpdatedItemIndex = mergedStoreArray.indexOf(toBeUpdatedItem);

      mergedStoreArray.splice(toBeUpdatedItemIndex, 1, resData);
      this.itemsStore.incompletedItems = mergedStoreArray.filter((itemObj) => itemObj.isDone === false);
      this.itemsStore.completedItems = mergedStoreArray.filter((itemObj) => itemObj.isDone === true);
      this.incompletedItemsBehaviorSubj.next(this.itemsStore.incompletedItems);
      this.completedItemsBehaviorSubj.next(this.itemsStore.completedItems);
    });
  }

  public patchItem$(item: ItemInterface, data: { isDone: boolean }): void {
    this.http.patch<ItemInterface>(`${this.url}/${item.id}`, data).subscribe((resData) => {
      const mergedStoreArray = [...this.itemsStore.incompletedItems, ...this.itemsStore.completedItems];
      const toBeUpdatedItem = mergedStoreArray.find((itemObj) => itemObj.id === resData.id);
      const toBeUpdatedItemIndex = mergedStoreArray.indexOf(toBeUpdatedItem);

      mergedStoreArray.splice(toBeUpdatedItemIndex, 1, resData);
      this.itemsStore.incompletedItems = mergedStoreArray.filter((itemObj) => itemObj.isDone === false);
      this.itemsStore.completedItems = mergedStoreArray.filter((itemObj) => itemObj.isDone === true);
      this.incompletedItemsBehaviorSubj.next(this.itemsStore.incompletedItems);
      this.completedItemsBehaviorSubj.next(this.itemsStore.completedItems);
    });
  }
}
