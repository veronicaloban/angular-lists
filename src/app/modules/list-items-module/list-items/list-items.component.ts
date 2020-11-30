import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { itemsSortingFunction } from '../items-sorting-function';

import { ListItemsService } from '../list-items.service';
import { ItemInterface } from '../item';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss'],
})
export class ListItemsComponent implements OnInit {
  public listId: string;
  public listName: string;
  public completedItems$: Observable<ItemInterface[]>;
  public incompletedItems$: Observable<ItemInterface[]>;

  constructor(
    private route: ActivatedRoute,
    private listItemsService: ListItemsService,
    private router: Router,
  ) {
    this.listName = this.router.getCurrentNavigation().extras.state.name as string;
  }

  public ngOnInit(): void {
    this.listId = this.route.snapshot.params.id as string;
    this.incompletedItems$ = this.listItemsService.incompletedItems$
      .pipe(tap((results) => results.sort(itemsSortingFunction)));
    this.completedItems$ = this.listItemsService.completedItems$
      .pipe(tap((results) => results.sort(itemsSortingFunction)));
    this.listItemsService.getItems$(this.listId);
  }
}
