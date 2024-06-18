import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ba-card',
  templateUrl: './baCard.html',
})
export class BaCard {
  @Input() title:String;
  @Input() baCardClass:String;
  @Input() cardType:String;

  @Input() showButton1: boolean;
  @Input() button1Class: string;
  @Input() button1IconClass: string;
  @Input() button1Text: string;

  @Output() buttonClicked: EventEmitter<string> = new EventEmitter<string>();

  private onButtonClicked(button: string) {
    this.buttonClicked.emit(button);
  }
}
