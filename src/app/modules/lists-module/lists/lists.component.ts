import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from "@ngrx/store";
import { AppState } from '../../../store/lists/app-state.model';
import { LoadListsAction, AddListAction, DeleteListAction, EditListAction } from '../../../store/lists/lists.actions';

//import { StoreService } from '../../../services/store/store.service';
import { ListInterface } from '../list';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {
  public title = 'Мои списки';
  public lists$: Observable<ListInterface[]>;

  constructor(
  /*private storeService: StoreService*/
  private store: Store<AppState>
) {}

  public ngOnInit(): void {
    //this.lists$ = this.storeService.getLists$();
    this.store.dispatch(LoadListsAction());
    this.lists$ = this.store.select(store => store.lists.list);
  }

  public onCreateList($event: string): void {
    //this.storeService.createList$({ name: $event });
    this.store.dispatch(AddListAction( {name: $event}))
  }

  public onDeleteList($event: ListInterface): void {
    //this.storeService.deleteList$($event);
    this.store.dispatch(DeleteListAction( $event ));
  }

  public onEditList($event: { listId: number, name: string }): void {
    //this.storeService.putList$($event.listId, { name: $event.name });
    this.store.dispatch(EditListAction( {id: $event.listId, name: $event.name } ));
  }
}
