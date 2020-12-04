import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  public transform<T extends {name: string}>(items: T[], searchString: string): T[] {
    if (!items) {
      return [];
    }

    if (!searchString) {
      return items;
    }

    const regExp = new RegExp(searchString, 'i');

    return items.filter((item) => regExp.test(item.name));
  }
}
