import { Component } from '@angular/core';
import { WordService } from './services/word.service';
import { finalize, filter, map, take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  generatedPlate: string | null = null;
  loading = false;

  constructor(private wordService: WordService) { }

  async onGenerate(characters: number): Promise<void> {
    try {
      this.loading = true;

      this.wordService.getRandomWords()
        .pipe(
          take(1), // Take only the first emission
          filter((words: string[]) => !!words && words.length > 0), // Filter out empty or undefined arrays
          map((words: string[]) => {
            const filteredWords = words.filter(word => word.length === characters);
            const randomIndex = Math.floor(Math.random() * filteredWords.length);
            return filteredWords[randomIndex].toUpperCase();
          }),
          finalize(() => this.loading = false) // Set loading to false regardless of success or error
        )
        .subscribe((plate: string) => {
          this.generatedPlate = plate; // Assign the generated plate
        }, (error) => {
          console.error('Error fetching random words:', error);
          this.loading = false; // Set loading to false in case of error
        });

    } catch (error) {
      console.error('Error:', error);
      this.loading = false; // Set loading to false in case of error
    }
  }
}
