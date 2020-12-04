import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

import { ListInterface } from '../../modules/lists-module/list';
import { ItemInterface } from '../../modules/list-items-module/item';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private urlLists = `${environment.apiUrl}/lists`;
  private urlItems = `${environment.apiUrl}/items`;

  constructor(private http: HttpClient) { }

  public getLists$(): Observable<ListInterface[]> {
    return this.http.get<ListInterface[]>(this.urlLists);
  }

  public createList$(data: { name: string }): Observable<ListInterface> {
    return this.http.post<ListInterface>(this.urlLists, data);
  }

  public deleteList$(list: ListInterface): Observable<ListInterface> {
    return this.http.delete<ListInterface>(`${this.urlLists}/${list.id}`);
  }

  public putList$(id: number, data: { name: string }): Observable<ListInterface> {
    return this.http.put<ListInterface>(`${this.urlLists}/${id}`, data);
  }

  public getItems$(listId: string): Observable<ItemInterface[]> {
    return this.http.get<ItemInterface[]>(this.urlItems, { params: { listId } });
  }

  public getListName$(listId: string): Observable<string> {
    return this.http.get<string>(`${environment.apiUrl}/list-name`, { params: { listId } });
  }

  public createItem$(listId: string, data: { name: string }): Observable<ItemInterface> {
    return this.http.post<ItemInterface>(this.urlItems, data, { params: { listId } });
  }

  public putItem$(item: ItemInterface, data: { name: string }, listId: string): Observable<ItemInterface> {
    return this.http.put<ItemInterface>(`${this.urlItems}/${item.id}`, data, { params: { listId } });
  }

  public patchItem$(item: ItemInterface, data: { isDone: boolean }): Observable<ItemInterface> {
    return this.http.patch<ItemInterface>(`${this.urlItems}/${item.id}`, data);
  }

  public deleteItem$(item: ItemInterface): Observable<ItemInterface> {
    return this.http.delete<ItemInterface>(`${this.urlItems}/${item.id}`);
  }
}
