import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ItemInterface } from './item';

@Injectable()
export class ListItemsService {
  private url = `${environment.apiUrl}/items/`;
  private itemsBehaviorSubj = new BehaviorSubject<ItemInterface[]>([]);
  private itemsStore: ItemInterface[] = [];
  public readonly items$ = this.itemsBehaviorSubj.asObservable();

  constructor(private http: HttpClient) { }

  public getItems$(listId: number): void {
    this.http.get<ItemInterface[]>(this.url, { params: { listId: `${listId}` } }).subscribe((res) => {
      this.itemsStore = res;
      this.itemsBehaviorSubj.next(this.itemsStore);
    });
  }
}
