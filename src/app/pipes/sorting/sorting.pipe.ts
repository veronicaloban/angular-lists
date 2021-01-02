import { Pipe, PipeTransform } from '@angular/core';
import { sortingFunction } from '../../helpers/sortingFunction';

@Pipe({
  name: 'sorting',
  pure: false,
})
export class SortingPipe implements PipeTransform {
  public transform<T extends { name: string, isDone: boolean }>(items: T[]): T[] {
    if (!items) {
      return [];
    }

    const completedItems: T[] = [];
    const incompletedItems: T[] = [];

    items.forEach((item) => {
      if (item.isDone) {
        completedItems.push(item);
      } else {
        incompletedItems.push(item);
      }
    });

    incompletedItems.sort(sortingFunction);
    completedItems.sort(sortingFunction);

    return [...incompletedItems, ...completedItems];
  }
}
