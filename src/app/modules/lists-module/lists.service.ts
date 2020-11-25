import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListInterface } from './list';

@Injectable()
export class ListsService {
  private url = `${environment.apiUrl}/lists`;
  private listsBehaviorSubj= new BehaviorSubject<ListInterface[]>([]);
  private listsStore: ListInterface[] = [];
  public readonly lists$ = this.listsBehaviorSubj.asObservable();

  constructor(private http: HttpClient) {}

  public getLists$(): void {
    this.http.get<ListInterface[]>(this.url).subscribe((res) => res.forEach((data: ListInterface) => {
      this.listsStore.push(data);
      this.listsBehaviorSubj.next(this.listsStore);
    }));
  }

  public createList$(data: { name: string }): void {
    this.http.post<ListInterface>(this.url, data).subscribe((resData) => {
      this.listsStore.push(resData);
      this.listsBehaviorSubj.next(this.listsStore);
    });
  }

  public deleteList$(list: ListInterface): void {
    this.http.delete<ListInterface>(`${this.url}/${list.id}`).subscribe(() => {
      const deletedListIndex = this.listsStore.indexOf(list);
      this.listsStore.splice(deletedListIndex, 1);
      this.listsBehaviorSubj.next(this.listsStore);
    });
  }

  public putList$(id: number, data: { name: string }): void {
    this.http.put<ListInterface>(`${this.url}/${id}`, data).subscribe((resData) => {
      const toBeUpdatedList = this.listsStore.find((item) => item.id === resData.id);
      const toBeUpdatedListIndex = this.listsStore.indexOf(toBeUpdatedList);
      this.listsStore.splice(toBeUpdatedListIndex, 1, resData);
    });
  }
}
