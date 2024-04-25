import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Notes } from '../models/notes.model';
import { resType } from '../components/notes/notes.component';

const jsonServerURL = "https://shraddha-bijotkar.github.io/keeper-json/db.json";

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private http: HttpClient) { }

  getAllNotes(): Observable<any> {
    return this.http.get(jsonServerURL).pipe(
      catchError(this.handleError)
    );
  }

  getNoteById(noteId: string): Observable<any> {
    return this.http.get(jsonServerURL+"/"+noteId).pipe(
      catchError(this.handleError)
    );
  }

  // getAllSavedMatches(): Observable<any> {
  //   return this.http.get(jsonServerURL).pipe(
  //     catchError(this.handleError)
  //   );
  // }

  postNote(note: Notes): Observable<any> {
    return this.http.post(jsonServerURL, note).pipe(
      catchError(this.handleError)
    );
  }

  deleteNoteById(id: number): Observable<any> {
    return this.http.delete(jsonServerURL+"/"+id).pipe(
      catchError(this.handleError)
    );
  }

  updateNoteById(note: Notes): Observable<any> {
    return this.http.put(jsonServerURL+"/"+note.id, {note}).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.')
  }

}
