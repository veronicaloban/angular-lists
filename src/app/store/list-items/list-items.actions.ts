import { createAction, props } from "@ngrx/store";
import { ItemInterface } from "../../modules/list-items-module/item";

export enum ItemsActionTypes {
  LOAD_ITEMS = "[ITEMS] Load Items",
  LOAD_ITEMS_SUCCESS = "[ITEMS] Load Items Success",
  LOAD_ITEMS_FAILURE = "[ITEMS] Load Items Failure",
}

export const LoadItemsAction = createAction(
  ItemsActionTypes.LOAD_ITEMS,
  props< { listId: string }>()
)

export const LoadItemsSuccessAction = createAction(
  ItemsActionTypes.LOAD_ITEMS_SUCCESS,
  props< { items: ItemInterface[] } >()
)

export const LoadItemsFailureAction = createAction(
  ItemsActionTypes.LOAD_ITEMS_FAILURE,
  props<Error>()
)
