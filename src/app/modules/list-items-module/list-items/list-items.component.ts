import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { StoreService } from '../../../services/store/store.service';
import { ItemInterface } from '../item';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss'],
})
export class ListItemsComponent implements OnInit {
  public searcher: string;
  public listId: string;
  public listName$: Observable<string>;
  public items$: Observable<ItemInterface[]>;

  constructor(
    private route: ActivatedRoute,
    private storeService: StoreService,
  ) {}

  public ngOnInit(): void {
    this.listId = this.route.snapshot.params.id as string;
    this.listName$ = this.storeService.getListName$(this.listId);
    this.items$ = this.storeService.getItems$(this.listId);
  }

  public onDeleteItem($event: ItemInterface): void {
    this.storeService.deleteItem$($event);
  }

  public onChangeItem($event: { item: ItemInterface, isDone: boolean }): void {
    this.storeService.patchItem$($event.item, { isDone: $event.isDone });
  }

  public onChangeName($event: {item: ItemInterface, name: string}): void {
    this.storeService.putItem$($event.item, { name: $event.name }, this.listId);
  }

  public onCreateItem($event: string): void {
    this.storeService.createItem$(this.listId, { name: $event });
  }
}
