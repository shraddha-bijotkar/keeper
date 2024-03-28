import { Component, TemplateRef, Input, ElementRef, ViewChild, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { NgbDatepickerModule, NgbOffcanvas, OffcanvasDismissReasons, NgbOffcanvasOptions } from '@ng-bootstrap/ng-bootstrap';
import { SideBarComponent } from '../side-bar/side-bar.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NavBarComponent {
  flag = true;

  @Input() containerRef!: HTMLElement;
  @Output() newItemEvent = new EventEmitter<boolean>();

  offcanvasOptions: NgbOffcanvasOptions = {};

  constructor(private offcanvasService: NgbOffcanvas) {}

  open(flag: boolean) {
    this.addNewItem(flag);

    this.flag = !flag;

    this.offcanvasOptions.container = this.containerRef;
    this.offcanvasOptions.backdrop = false;
    this.offcanvasOptions.animation = true;
    this.offcanvasOptions.panelClass = 'details-panel';

    if(!flag) {
      this.offcanvasService.dismiss('Cross click');
    }
    else if(flag) {
      const offcanvasRef = this.offcanvasService.open(SideBarComponent, this.offcanvasOptions);
    
	  	offcanvasRef.componentInstance.name = 'World';
    }
  }
  
  addNewItem(value: boolean) {
    this.newItemEvent.emit(value);
  }

}
