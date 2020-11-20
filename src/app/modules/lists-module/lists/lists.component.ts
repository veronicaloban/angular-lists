import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ListsServiceService } from '../lists-service.service';
import { ListInterface } from '../list';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
  providers: [ListsServiceService],
})
export class ListsComponent {
  public title = 'Мои списки';
  public lists$: Observable<ListInterface[]> = this.listsService.getLists$();

  constructor(private listsService: ListsServiceService) { }
}
