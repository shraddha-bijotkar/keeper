import { Component, OnInit, Input, SimpleChanges, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as uuid from 'uuid';
import { Notes } from 'src/app/models/notes.model';
import { OperationsService } from 'src/app/services/operations.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  myForm!: FormGroup;
  date = new Date();
  note!: Notes;

	@Input() name!: string;
  @Input() openedNote!: Notes;
  @Input() isClicked!: boolean;
  
  constructor(private fb: FormBuilder, private opService: OperationsService, public activeModal: NgbActiveModal) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
     if(this.isClicked && this.openedNote) {
      this.myForm = this.fb.group({
        id: this.openedNote.id,
        noteTitle: this.openedNote.noteTitle,
        noteBody: this.openedNote.noteBody,
        createdAt: this.openedNote.createdAt,
        pinned: this.openedNote.pinned,
        archived: this.openedNote.archived,
        trashed: this.openedNote.trashed,
        hover: this.openedNote.hover,
        bgColor: this.openedNote.bgColor,
        bgImage: this.openedNote.bgImage
      });
      console.log(this.myForm, 'Editing this pre-filled form');
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['openedNote'] && changes['openedNote'].currentValue) {
      this.initializeForm();
    }
  }

  onEdit(form: FormGroup) {
    console.log(form.value, "I am in onEdit");
    if(!form.valid) return;

    if(form.valid) {
      this.opService.updateNote(form.value);
    }
    form.reset();
  }
}
