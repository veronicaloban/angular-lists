import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListInterface } from './list';

@Injectable()
export class ListsServiceService {
  private url = `${environment.apiUrl}/lists`;

  constructor(private http: HttpClient) { }

  public getLists$(): Observable<ListInterface[]> {
    return this.http.get<ListInterface[]>(this.url);
  }
}
