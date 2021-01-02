import { createAction, props } from "@ngrx/store";
import { ListInterface } from "../../modules/lists-module/list";

export enum ListsActionTypes {
  LOAD_LISTS = '[LISTS] Load Lists',
  LOAD_LISTS_SUCCESS = '[LISTS] Load Lists Success',
  LOAD_LISTS_FAILURE = '[LIST] Load Lists Failure',
  DELETE_LIST = '[LISTS] Delete List',
  DELETE_LIST_SUCCESS = '[LISTS] Delete List Success',
  DELETE_LIST_FAILURE = '[LISTS] Delete List Failure',
  ADD_LIST = '[LISTS] Add List',
  ADD_LIST_SUCCESS = '[LISTS] Add List Success',
  ADD_LIST_FAILURE = '[LISTS] Add List Failure',
  EDIT_LIST = '[LISTS] Edit List',
  EDIT_LIST_SUCCESS = '[LISTS] Edit List Success',
  EDIT_LIST_FAILURE = '[LISTS] Edit List Failure'
}

export const LoadListsAction = createAction(
  ListsActionTypes.LOAD_LISTS
)

export const LoadListsSuccessAction = createAction(
  ListsActionTypes.LOAD_LISTS_SUCCESS,
  props<{ lists: ListInterface[] }>()
)

export const LoadListsFailureAction = createAction(
  ListsActionTypes.LOAD_LISTS_FAILURE,
  props<Error>()
)

export const DeleteListAction = createAction(
  ListsActionTypes.DELETE_LIST,
  props<ListInterface>()
)

export const DeleteListSuccessAction = createAction(
  ListsActionTypes.DELETE_LIST_SUCCESS,
  props<ListInterface>()
)

export const DeleteListFailureAction = createAction(
  ListsActionTypes.DELETE_LIST_FAILURE,
  props<Error>()
)

export const AddListAction = createAction(
  ListsActionTypes.ADD_LIST,
  props<any>()
)

export const AddListSuccessAction = createAction(
  ListsActionTypes.ADD_LIST_SUCCESS,
  props<ListInterface>()
)

export const AddListFailureAction = createAction(
  ListsActionTypes.ADD_LIST_FAILURE,
  props<Error>()
)

export const EditListAction = createAction(
    ListsActionTypes.EDIT_LIST,
    props<any>()
  )

  export const EditListSuccessAction = createAction(
    ListsActionTypes.EDIT_LIST_SUCCESS,
    props<ListInterface>()
  )

  export const EditListFailureAction = createAction(
    ListsActionTypes.EDIT_LIST_FAILURE,
    props<Error>()
)
