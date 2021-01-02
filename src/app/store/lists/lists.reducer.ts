import { Action, createReducer, on } from "@ngrx/store";
import { ListInterface } from "../../modules/lists-module/list";

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

export interface ListsState {
  list: ListInterface[],
  loading: boolean,
  error: Error
}

const initialState: ListsState = {
  list: [],
  loading: false,
  error: undefined
}

const ListsReducerImplicit = createReducer(
  initialState,
  on(LoadListsAction, state => ({...state, loading: true})),
  on(LoadListsSuccessAction, (state, { lists } ) => ({...state, list: lists, loading: false})),
  on(LoadListsFailureAction, (state, err) => ({...state, loading: false, error: err})),
  on(AddListAction, (state,  list ) => ({...state, loading: true})),
  on(AddListSuccessAction, (state, list) => ({...state, list: [...state.list, list], loading: false})),
  on(AddListFailureAction, (state, err) => ({...state, loading: false, error: err})),
  on(DeleteListAction, (state, list) => ({...state, loading: true})),
  on(DeleteListSuccessAction, (state, list) => ({...state, list: state.list.filter(previousList => previousList.id !== list.id), loading: false})),
  on(DeleteListFailureAction, (state, err) => ({...state, loading: false, error: err})),
  on(EditListAction, (state, { id: number, name: string}) => ({...state, loading: true})),
  on(EditListSuccessAction, (state, list) => {
    const updatedLists = state.list.map(previousList => {
      return previousList.id === list.id? previousList = list : previousList
    })
    return {...state, list: updatedLists, loading: false }
  }),
  on(EditListFailureAction, (state, err) => ({...state, loading: false, error: err})),
)
export function ListsReducer(state: any, action: Action) {
  return ListsReducerImplicit(state, action);
}
