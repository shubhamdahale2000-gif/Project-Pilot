import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
    pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: any, searchText: string): any {
   
    if (!value || !searchText) {
      return value;
    }
    searchText = searchText.trim().toLowerCase();
    return value.filter((item: any) => {
      const projectName = item.projectName.trim().toLowerCase();
      return projectName.includes(searchText);
    });
  }
}


