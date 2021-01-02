import { createSelector } from '@ngrx/store';
import { ListsState } from './lists.reducer';

// ********* В данном приложении не используется
export const selectLists = (state: ListsState) => state.list;
