import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-character-selector',
  templateUrl: './character-selector.component.html',
  styleUrls: ['./character-selector.component.scss']
})
export class CharacterSelectorComponent {
  @Output() generate = new EventEmitter<number>();

  generatePlate(characters: string): void {
    this.generate.emit(parseInt(characters, 10));
  }
}
