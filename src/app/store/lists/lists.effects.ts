import { Injectable } from "@angular/core";
import { Action } from '@ngrx/store';
import { ListInterface } from '../../modules/lists-module/list';
import { createEffect, ofType, Actions } from "@ngrx/effects";
import { mergeMap, map, catchError } from "rxjs/operators";
import { Observable, of } from "rxjs";
import { ApiService } from '../../services/api/api.service';
import {
  ListsActionTypes,
  LoadListsAction,
  LoadListsSuccessAction,
  LoadListsFailureAction,
  AddListAction,
  AddListSuccessAction,
  AddListFailureAction,
  DeleteListAction,
  DeleteListSuccessAction,
  DeleteListFailureAction,
  EditListAction,
  EditListSuccessAction,
  EditListFailureAction
} from "./lists.actions";

@Injectable()
export class ListsEffects {

  public loadListsEffect$: Observable<Action> = createEffect(() =>
  this.actions$
  .pipe(
    ofType(ListsActionTypes.LOAD_LISTS),
    mergeMap(
      () => this.apiService.getLists$()
      .pipe(
        map(( lists ) => LoadListsSuccessAction({ lists })),
        catchError(err => of(LoadListsFailureAction(err)))
      )
    )
))

public addListEffect$: Observable<Action> = createEffect(() =>
this.actions$
.pipe(
  ofType(ListsActionTypes.ADD_LIST),
  mergeMap(
    (list: ListInterface) => this.apiService.createList$( { name: list.name } )
    .pipe(
      map((list: ListInterface) => AddListSuccessAction( list )),
      catchError(err => of(AddListFailureAction(err)))
    )
  )
))

public deleteListEffect$: Observable<Action> = createEffect(() =>
this.actions$
.pipe(
  ofType(ListsActionTypes.DELETE_LIST),
  mergeMap(
    (list: ListInterface) => this.apiService.deleteList$( {id : list.id} )
    .pipe(
      map(() => DeleteListSuccessAction( list)),
      catchError(err => of(DeleteListFailureAction(err)))
    )
  )
))

public editListEffect$: Observable<Action> = createEffect(() =>
this.actions$
.pipe(
  ofType(ListsActionTypes.EDIT_LIST),
  mergeMap(
    (data: { id: number, name: string}) => this.apiService.putList$( data )
    .pipe(
      map((list: ListInterface) => EditListSuccessAction( list)),
      catchError(err => of(EditListFailureAction(err)))
    )
  )
))

  constructor(private apiService: ApiService, private actions$: Actions) { }
}
