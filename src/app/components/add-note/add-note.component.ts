import { Component, SimpleChanges, HostListener, ViewChild, ElementRef, Renderer2, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Notes } from 'src/app/models/notes.model';
import { OperationsService } from 'src/app/services/operations.service';
import {bgColors, bgImages} from '../../models/backgrounds';
import * as uuid from 'uuid';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent {
  myForm!: FormGroup;
  date = new Date();
  note!: Notes;
  hover = false;
  clickedNew = false;
  bgColors = bgColors;
  bgImages = bgImages;
  openColors = false;
  openImages = false;
  @ViewChild('input') elementRef!: ElementRef;
  @ViewChild('toggleButton') toggleButton!: ElementRef;

  constructor(private fb: FormBuilder, private opService: OperationsService, private renderer: Renderer2) {
    this.renderer.listen('window', 'click',(e:Event)=>{
      /**
       * Only run when toggleButton is not clicked
       * If we don't check this, all clicks (even on the toggle button) gets into this
       * section which in the result we might never see the menu open!
       * And the menu itself is checked here, and it's where we check just outside of
       * the menu and button the condition abbove must close the menu
       */
      if(!this.toggleButton.nativeElement.contains(e.target) && !this.elementRef.nativeElement.contains(e.target)) {
          this.clickedNew = false;
      }
  });
  }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.myForm = this.fb.group({
      id: uuid.v4(),
      noteTitle: ['', Validators.required],
      noteBody: ['', [Validators.required]],
      createdAt: this.date,
      pinned: false,
      archived: false,
      trashed: false,
      hover: false,
      bgColor: '#212529',
      bgImage: ''
    });
  }
  
  onSubmit(form: FormGroup) {
    console.log(form.value, "I am in onSubmit");
    if(!form.valid) return;

    if(form.valid) {
      this.opService.addNote(form.value);
    }
    form.reset();
  }

  clickNew() {
    this.clickedNew = true;
  }

  setColor(value: string) {
    console.log(value, 'value');
    this.elementRef.nativeElement.style.background = value;
    this.myForm.value['bgColor'] = value;
  }

  setImage(img: string) {
    console.log(img, 'img');
    this.elementRef.nativeElement.style.backgroundImage = `url(${img})`;
    this.myForm.value['bgImage'] = img;
  }
  
  
}
