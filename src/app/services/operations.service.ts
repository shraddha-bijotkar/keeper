import { Injectable } from '@angular/core';
import { NotesService } from './notes.service';
import { Notes } from '../models/notes.model';
import { resType } from '../components/notes/notes.component';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {
  allNotes: resType = {notes: []};
  trashedNotes: Notes[] = [];
  viewNote!: Notes;
  hover!: boolean;

  constructor(private notesService: NotesService) { }

  async fetchAllNotes() {
    try {
        let res: any = await this.notesService.getAllNotes().toPromise();
        this.allNotes = res;
        console.log(this.allNotes, 'result');
        return this.allNotes;
    } catch (error) {
        console.error('Error fetching notes', error);
        return {notes: []};
    }
}
  // public async fetchAllNotes() {
  //   this.notesService.getAllNotes().subscribe((res: Notes[]) => {
  //     res = res.filter(x => x.trashed === false && x.archived === false);
  //     console.log(res, 'Fetch called after adding');
  //     this.allNotes = res;
  //     console.log(res);
  //   },
  //   (error: any) => {
  //     console.log(error, 'An error occured while fetching the notes!');
  //   });
  //   //return this.allNotes;
  // }

  public fetchNoteById(noteId: string) {
    this.notesService.getNoteById(noteId).subscribe((res: Notes) => {
      this.viewNote = res;
      console.log(res);
    },
    (error: any) => {
      console.log(error, 'An error occured while fetching this note!');
    });
  }

  public addNote(note: Notes) {
    this.notesService.postNote(note).subscribe((res: any) => {
      console.log('This note has been saved');
      window.location.reload();
    },
    (error: any) => {
      console.log(error, 'An error occured while saving this note!');
    });
  }

  public deleteNoteFromUI(note: Notes) {
    note.trashed = true;
    this.notesService.updateNoteById(note).subscribe((res: any) => {
      console.log('This note has been deleted successfully');
      this.fetchAllNotes();
    },
    (error: any) => {
      console.log(error, 'An error occured while deleting this note!');
    });
  }

  public updateNote(note: Notes) {
    this.notesService.updateNoteById(note).subscribe((res: any) => {
      console.log('This note has been updated successfully');
      window.location.reload();
    },
    (error: any) => {
      console.log(error, 'An error occured while updating this note!');
    });
  }

  public archieveNote(note: Notes) {
    note.archived = true;
    this.notesService.updateNoteById(note).subscribe((res: any) => {
      console.log('This note has been archieved successfully');
      window.location.reload();
    },
    (error: any) => {
      console.log(error, 'An error occured while archieving this note!');
    });
  }
}
