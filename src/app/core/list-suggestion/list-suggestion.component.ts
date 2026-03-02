import { Component, OnInit } from '@angular/core';
import { SuggestionService } from '../services/suggestion.service';
import { Suggestion } from '../../models/suggestion';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-suggestion',
  templateUrl: './list-suggestion.component.html',
  styleUrls: ['./list-suggestion.component.css']
})
export class ListSuggestionComponent implements OnInit {
  suggestions: Suggestion[] = [];
  searchText: string = '';
  favorites: Suggestion[] = [];

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

  get filteredSuggestions(): Suggestion[] {
    if (!this.searchText) {
      return this.suggestions;
    }
    return this.suggestions.filter(s => 
      s.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
      s.category.toLowerCase().includes(this.searchText.toLowerCase())
    );
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

  addToFavorites(s: Suggestion): void {
    if (!this.favorites.find(f => f.id === s.id)) {
      this.favorites.push(s);
      alert('Suggestion ajoutée aux favoris!');
    }
  }
}
