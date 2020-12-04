import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { ListInterface } from '../../modules/lists-module/list';
import { ItemInterface } from '../../modules/list-items-module/item';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private listsBehaviorSubj$ = new BehaviorSubject<ListInterface[]>([]);
  private itemsBehaviorSubj$ = new BehaviorSubject<ItemInterface[]>([]);

  public lists$ = this.listsBehaviorSubj$.asObservable();
  public items$ = this.itemsBehaviorSubj$.asObservable();

  public appStore = {
    lists: [] as ListInterface[],
    items: [] as ItemInterface[],
  };

  constructor(private apiService: ApiService) {}

  public getLists$(): Observable<ListInterface[]> {
    return this.apiService.getLists$().pipe(flatMap((res) => {
      this.appStore.lists = res;
      this.listsBehaviorSubj$.next(this.appStore.lists);
      return this.lists$;
    }));
  }

  public createList$(data: { name: string }): void {
    this.apiService.createList$(data).subscribe((res) => {
      this.appStore.lists.push(res);
      this.listsBehaviorSubj$.next(this.appStore.lists);
    });
  }

  public deleteList$(list: ListInterface): void {
    this.apiService.deleteList$(list).subscribe(() => {
      this.appStore.lists = this.appStore.lists.filter((elem) => elem.id !== list.id);
      this.listsBehaviorSubj$.next(this.appStore.lists);
    });
  }

  public putList$(id: number, data: { name: string }): void {
    this.apiService.putList$(id, data).subscribe((resData) => {
      const listToUpdate = this.appStore.lists.find((val) => val.id === resData.id);

      listToUpdate.name = resData.name;
      this.listsBehaviorSubj$.next(this.appStore.lists);
    });
  }

  public getItems$(listId: string): Observable<ItemInterface[]> {
    return this.apiService.getItems$(listId).pipe(flatMap((res) => {
      this.appStore.items = res;
      this.itemsBehaviorSubj$.next(this.appStore.items);
      return this.items$;
    }));
  }

  public getListName$(listId: string): Observable<string> {
    return this.apiService.getListName$(listId);
  }

  public createItem$(listId: string, data: { name: string }): void {
    this.apiService.createItem$(listId, data).subscribe((resData) => {
      this.appStore.items.push(resData);
      this.itemsBehaviorSubj$.next(this.appStore.items);
    });
  }

  public putItem$(item: ItemInterface, data: { name: string }, listId: string): void {
    this.apiService.putItem$(item, data, listId).subscribe((resData) => {
      const itemToUpdate = this.appStore.items.find((val) => val.id === resData.id);

      itemToUpdate.name = resData.name;
      this.itemsBehaviorSubj$.next(this.appStore.items);
    });
  }

  public patchItem$(item: ItemInterface, data: { isDone: boolean }): void {
    this.apiService.patchItem$(item, data).subscribe((resData) => {
      const itemToUpdate = this.appStore.items.find((val) => val.id === resData.id);

      itemToUpdate.isDone = resData.isDone;
      this.itemsBehaviorSubj$.next(this.appStore.items);
    });
  }

  public deleteItem$(item: ItemInterface): void {
    this.apiService.deleteItem$(item).subscribe(() => {
      this.appStore.items = this.appStore.items.filter((elem) => elem.id !== item.id);
      this.itemsBehaviorSubj$.next(this.appStore.items);
    });
  }
}
