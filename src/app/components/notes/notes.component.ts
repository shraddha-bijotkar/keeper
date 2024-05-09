import { Component, OnInit, Output, EventEmitter, inject, Input, Injector, ViewChild, ElementRef } from '@angular/core';
import { Notes } from 'src/app/models/notes.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OperationsService } from 'src/app/services/operations.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InputComponent } from '../input/input.component';
import { bgColors, bgImages } from 'src/app/models/backgrounds';

@Component({
    selector: 'app-notes',
    templateUrl: './notes.component.html',
    styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
    allNotes: any[] = [];
    trashedNotes: Notes[] = [];
    viewNote!: Notes;
    hover!: boolean;
    current = new Date();
    currentDate: any;
    bgColors = bgColors;
    bgImages = bgImages;
    openColors = false;
    openImages = false;
    searchForm!: FormGroup;
    @Input() searchText: string = '';
    @ViewChild('input') elementRef!: ElementRef;
    @ViewChild('toggleButton') toggleButton!: ElementRef;

    //@Output() editNoteEvent = new EventEmitter();
  
    note = {
        "id": 5,
        "noteTitle": "Title 5",
        "noteBody": "Note 5 body",
        "createdAt": this.current,
        "pinned": true,
        "archived": false,
        "trashed": false,
        "hover": false
    };

  
    constructor(private fb: FormBuilder, 
                private opService: OperationsService) {}
    private modalService = inject(NgbModal);
    ngOnInit() {
        console.log(this.searchText, 'searchText')
        this.currentDate = this.current.getDate();
        this.initialise();
    }

    async initialise() {
        await this.fetchAllNotes();
    }

    public async fetchAllNotes() {
        let res: Notes[] = await this.opService.fetchAllNotes();
        let arrRes = [];
        //console.log(res.filter((x: any) => x.archived == false || x.note.trashed == false));
        console.log(res, 'Hey res here!');
        arrRes = res.filter((x: any) => (x.trashed == false && x.archived == false) || (x.note.trashed == false && x.note.archived == false));
        arrRes = res.map(x => {
            if(x.note) {
                return x = x.note;
            }
            else  return x = x; 
        });
        this.allNotes = arrRes;
        console.log('M in Notes', this.allNotes);
    }

    public fetchNoteById(noteId: string) {
        this.opService.fetchNoteById(noteId);
    }

    public addNote(note: Notes) {
        this.opService.addNote(note);
    }

    public deleteNoteFromUI(note: Notes) {
        this.opService.deleteNoteFromUI(note);
    }

    public updateNote(note: Notes) {
        //let event = {value: true, note: note}
        //this.editNoteEvent.emit(event);
        const modalRef = this.modalService.open(InputComponent, { injector: Injector.create({
          providers: [
              { provide: 'isClicked', useValue: true },
              { provide: 'openedNote', useValue: note }
          ]
      }) });

      modalRef.componentInstance.isClicked = true;
      modalRef.componentInstance.openedNote = note;    
    }

    public archieveNote(note: Notes) {
        this.opService.archieveNote(note);
    }

    open() {
      const modalRef = this.modalService.open(InputComponent);
    }

    setColor(value: string, note: Notes) {
        console.log(value, 'value');
        note.bgColor = value;
        this.elementRef.nativeElement.style.background = value;
        console.log(note, 'color');
        this.opService.updateNote(note);
    }
    
    setImage(img: string, note: Notes) {
        note.bgImage = img;
        this.elementRef.nativeElement.style.backgroundImage = `url(${img})`;
        console.log(note, 'img');
        this.opService.updateNote(note);
    }
}
