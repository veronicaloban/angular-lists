import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { sortingFunction } from '../../../helpers/sorting-function';

import { ListItemsService } from '../list-items.service';
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
  public completedItems$: Observable<ItemInterface[]>;
  public incompletedItems$: Observable<ItemInterface[]>;

  constructor(
    private route: ActivatedRoute,
    private listItemsService: ListItemsService,
  ) {}

  public ngOnInit(): void {
    this.listId = this.route.snapshot.params.id as string;
    this.listName$ = this.listItemsService.getListName$(this.listId);
    this.incompletedItems$ = this.listItemsService.incompletedItems$
      .pipe(map((results) => results.sort(sortingFunction)));
    this.completedItems$ = this.listItemsService.completedItems$
      .pipe(map((results) => results.sort(sortingFunction)));
    this.listItemsService.getItems$(this.listId);
  }
}
