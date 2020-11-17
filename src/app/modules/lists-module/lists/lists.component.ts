import { Component, OnInit } from '@angular/core';
import { ListsServiceService } from '../lists-service.service';
import { ListInterface } from '../listInterface';
import { Config } from '../config';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {
  public lists: ListInterface[] = [];

  constructor(private listsService: ListsServiceService) { }

  ngOnInit(): void {
    this.showLists();
  }

  showLists(): void {
    this.listsService.getLists()
      .subscribe((data: Config[]) => data.map((item: Config) => this.lists.push({
        id: +item.id,
        name: item.name,
        items: +item.items,
        completedItems: +item.completedItems,
      })));
  }
}
