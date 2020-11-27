import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ListItemsService } from '../list-items.service';
import { ItemInterface } from '../item';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss'],
})
export class ListItemsComponent implements OnInit {
  public listId: number;
  public items$: Observable<ItemInterface[]>;

  constructor(private route: ActivatedRoute, private listItemsService: ListItemsService) { }

  public ngOnInit(): void {
    this.listId = this.route.snapshot.params.id as number;
    this.items$ = this.listItemsService.items$;
    this.listItemsService.getItems$(this.listId);
  }
}
