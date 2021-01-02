import { ListsState } from './lists.reducer';
import { ItemsState } from '../list-items/list-items.reducer';

export interface AppState {
  readonly lists: ListsState,
  readonly items: ItemsState
}
