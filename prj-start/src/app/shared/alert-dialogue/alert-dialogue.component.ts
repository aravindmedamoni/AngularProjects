import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alert-dialogue',
  templateUrl: './alert-dialogue.component.html',
  styleUrls: ['./alert-dialogue.component.css']
})
export class AlertDialogueComponent implements OnInit {

  @Input() message:string;
  @Output() close : EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onClose(){
    this.close.emit();
  }
}
