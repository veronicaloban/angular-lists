import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { StoreService } from '../../../services/store/store.service';
import { ListInterface } from '../list';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {
  public title = 'Мои списки';
  public lists$: Observable<ListInterface[]>;

  constructor(private storeService: StoreService) {}

  public ngOnInit(): void {
    this.lists$ = this.storeService.getLists$();
  }

  public onCreateList($event: string): void {
    this.storeService.createList$({ name: $event });
  }

  public onDeleteList($event: ListInterface): void {
    this.storeService.deleteList$($event);
  }

  public onEditList($event: { listId: number, name: string }): void {
    this.storeService.putList$($event.listId, { name: $event.name });
  }
}
