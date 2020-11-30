import { ItemInterface } from './item';

export function itemsSortingFunction(itemA: ItemInterface, itemB: ItemInterface): number {
  const nameA = itemA.name.toLowerCase();
  const nameB = itemB.name.toLowerCase();

  if (nameA > nameB) {
    return 1;
  } if (nameB > nameA) {
    return -1;
  }
  return 0;
}
