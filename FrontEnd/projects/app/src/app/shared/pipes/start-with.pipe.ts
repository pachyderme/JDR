import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'startWith',
})
export class StartWithPipe implements PipeTransform {
  transform(
    items: any[],
    search: string,
    property: string,
    caseSensitive: boolean = false
  ): any[] {
    let result = [];

    if (!items || !search || !property) {
      result = items;
    } else {
      search = caseSensitive ? search : search.toLowerCase();
      result = items.filter((item) => {
        const value = caseSensitive
          ? item[property]
          : item[property].toLowerCase();
        return value.indexOf(search) === 0;
      });
    }

    return result;
  }
}
