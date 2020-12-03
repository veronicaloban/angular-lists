import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { StoreService } from '../../../store.service';
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
}
