import { Action, createReducer, on } from "@ngrx/store";
import {
  ItemsActionTypes,
  LoadItemsAction,
  LoadItemsSuccessAction,
  LoadItemsFailureAction
} from "./list-items.actions";

import { ItemInterface } from "../../modules/list-items-module/item";

export interface ItemsState {
  itemsList: ItemInterface[],
  loading: boolean,
  error: Error
}

const initialState: ItemsState = {
  itemsList: [],
  loading: false,
  error: undefined
}

const ItemsReducerImplicit = createReducer(
  initialState,
  on(LoadItemsAction, (state, {listId}) => ({...state, loading: true})),
  on(LoadItemsSuccessAction, (state, {items}) => ({...state, itemsList: items, loading: false})),
  on(LoadItemsFailureAction, (state, err) => ({...state, loading: false, error: err})),
)

export function ItemsReducer(state: any, action: Action) {
  return ItemsReducerImplicit(state, action);
}
