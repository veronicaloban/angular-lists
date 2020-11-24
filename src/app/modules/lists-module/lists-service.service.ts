import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListInterface } from './list';

@Injectable()
export class ListsServiceService {
  private url = `${environment.apiUrl}/lists`;

  private listsBehaviorSubj= new BehaviorSubject<ListInterface[]>([]);
  private dataStore: { lists: ListInterface[] } = { lists: [] };
  public readonly lists = this.listsBehaviorSubj.asObservable();

  constructor(private http: HttpClient) {}

  public getLists$(): void {
    this.http.get<ListInterface[]>(this.url).subscribe((data) => {
      this.dataStore.lists = data;
      this.listsBehaviorSubj.next(({ ...this.dataStore }).lists);
    });
  }

  public postNewList(newList: ListInterface): void{
    this.http.post<ListInterface>(this.url, newList).subscribe((data) => {
      this.dataStore.lists.push(data);
      this.listsBehaviorSubj.next(({ ...this.dataStore }).lists);
    });
  }
}
