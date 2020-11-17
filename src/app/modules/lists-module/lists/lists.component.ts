import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ListsServiceService } from '../lists-service.service';
import { ListInterface } from '../listInterface';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {
  public lists$: Observable<ListInterface[]>;

  constructor(private listsService: ListsServiceService) { }

  public ngOnInit(): void {
    this.showLists();
  }

  private showLists(): void {
    this.lists$ = this.listsService.getLists$();
  }
}
