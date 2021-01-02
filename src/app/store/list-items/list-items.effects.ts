import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { createEffect, ofType, Actions } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { mergeMap, map, catchError } from "rxjs/operators";

import {
  ItemsActionTypes,
  LoadItemsAction,
  LoadItemsSuccessAction,
  LoadItemsFailureAction
} from "./list-items.actions";

//import { ItemInterface } from "../../modules/list-items-module/item";
import { ApiService } from "../../services/api/api.service";

@Injectable()
export class ItemsEffects {

  public loadItemsEffect$: Observable<Action> = createEffect( () =>
    this.actions$
    .pipe(
      ofType(ItemsActionTypes.LOAD_ITEMS),
      mergeMap(
        ( data: {listId: string}) => this.apiService.getItems$(  data.listId )
        .pipe(
          map((items) => LoadItemsSuccessAction( { items } )),
          catchError(err => of(LoadItemsFailureAction(err)))
        )
      )
    )
  )

  public constructor(private apiService: ApiService, private actions$: Actions) {}
}
