import { Component } from '@angular/core';
import { Notes } from 'src/app/models/notes.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  item!: boolean;
  clicked!: boolean;
  note!: Notes;
  searchString!: string;

  addItem(newItem: boolean) {
    this.item = newItem;
  }

  searchItem(search: string) {
    this.searchString = search;
  }

  // editNote(clicked: any) {
  //   console.log(clicked, 'event');
  //   this.clicked = clicked.value;
  //   this.note = clicked.note;
  // }
}
