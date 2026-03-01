import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';

@Component({
  selector: 'app-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrls: ['./suggestion-form.component.css']
})
export class SuggestionFormComponent implements OnInit {
  suggestionForm!: FormGroup;
  categories: string[] = [
    'Infrastructure et bâtiments',
    'Technologie et services numériques',
    'Restauration et cafétéria',
    'Hygiène et environnement',
    'Transport et mobilité',
    'Activités et événements',
    'Sécurité',
    'Communication interne',
    'Accessibilité',
    'Autre'
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('fr-FR');

    this.suggestionForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^[A-Z][a-zA-Z]*$')]],
      description: ['', [Validators.required, Validators.minLength(30)]],
      category: ['', Validators.required],
      date: [{ value: formattedDate, disabled: true }],
      status: [{ value: 'EN_ATTENTE', disabled: true }]
    });
  }

  get title() {
    return this.suggestionForm.get('title');
  }

  get description() {
    return this.suggestionForm.get('description');
  }

  get category() {
    return this.suggestionForm.get('category');
  }

  onSubmit(): void {
    if (this.suggestionForm.valid) {
      const formValue = this.suggestionForm.getRawValue();
      
      const newSuggestion: Suggestion = {
        id: Date.now(),
        title: formValue.title,
        description: formValue.description,
        category: formValue.category,
        date: new Date(),
        status: 'EN_ATTENTE',
        nbLikes: 0
      };

      // Stocker la suggestion dans localStorage pour le partage
      const suggestions = JSON.parse(localStorage.getItem('suggestions') || '[]');
      suggestions.push(newSuggestion);
      localStorage.setItem('suggestions', JSON.stringify(suggestions));

      // Naviguer vers la liste des suggestions
      this.router.navigate(['/suggestions']);
    }
  }
}
