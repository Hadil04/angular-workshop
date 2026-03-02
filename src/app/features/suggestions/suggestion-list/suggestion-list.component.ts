import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SuggestionService } from '../../../core/services/suggestion.service';
import { Suggestion } from '../../../models/suggestion';

@Component({
  selector: 'app-suggestion-list',
  templateUrl: './suggestion-list.component.html',
  styleUrls: ['./suggestion-list.component.css']
})
export class SuggestionListComponent implements OnInit {
  suggestions: Suggestion[] = [];

  constructor(
    private suggestionService: SuggestionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSuggestions();
  }

  loadSuggestions(): void {
    this.suggestionService.getSuggestionsList().subscribe({
      next: (data) => {
        this.suggestions = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des suggestions', err);
      }
    });
  }

  likeSuggestion(s: Suggestion): void {
    this.suggestionService.updateNbLikes(s.id).subscribe({
      next: (updatedSuggestion) => {
        if (updatedSuggestion) {
          s.nbLikes = updatedSuggestion.nbLikes;
        }
      },
      error: (err) => {
        console.error('Erreur lors du like', err);
      }
    });
  }

  deleteSuggestion(s: Suggestion): void {
    this.suggestionService.deleteSuggestion(s.id).subscribe({
      next: () => {
        this.suggestions = this.suggestions.filter(suggestion => suggestion.id !== s.id);
        this.router.navigate(['/suggestions']);
      },
      error: (err) => {
        console.error('Erreur lors de la suppression', err);
      }
    });
  }
}
