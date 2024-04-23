import { Pipe, PipeTransform } from '@angular/core';
import { Notes } from '../models/notes.model';

@Pipe({
  name: 'search'
})
export class SearchPipePipe implements PipeTransform {

  transform(value: Notes[], args?: string): Notes[] {
    if(!args) {
      return value;
    }
    return value.filter(note => {
      return note?.noteTitle?.toLocaleLowerCase().includes(args) || note?.noteBody?.toLocaleLowerCase().includes(args);
    });
  }

}
