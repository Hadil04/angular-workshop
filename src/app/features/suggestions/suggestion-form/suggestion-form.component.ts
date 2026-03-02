import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../core/services/suggestion.service';

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
  
  isEditMode: boolean = false;
  suggestionId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private suggestionService: SuggestionService
  ) {}

  ngOnInit(): void {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('fr-FR');

    // Initialize form for add mode by default
    this.suggestionForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^[A-Z][a-zA-Z]*$')]],
      description: ['', [Validators.required, Validators.minLength(30)]],
      category: ['', Validators.required],
      date: [{ value: formattedDate, disabled: true }],
      status: [{ value: 'en attente', disabled: true }]
    });

    // Check if we're in edit mode
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.suggestionId = Number(id);
      this.isEditMode = true;
      this.loadSuggestionForEdit();
    }
  }

  loadSuggestionForEdit(): void {
    if (this.suggestionId) {
      this.suggestionService.getSuggestionById(this.suggestionId).subscribe({
        next: (data) => {
          const formattedDate = new Date(data.date).toLocaleDateString('fr-FR');
          this.suggestionForm.patchValue({
            title: data.title,
            description: data.description,
            category: data.category,
            date: formattedDate,
            status: data.status
          });
        },
        error: (err) => {
          console.error('Erreur lors du chargement de la suggestion', err);
        }
      });
    }
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
      
      if (this.isEditMode && this.suggestionId) {
        // Mode modification
        const updatedSuggestion: Suggestion = {
          id: this.suggestionId,
          title: formValue.title,
          description: formValue.description,
          category: formValue.category,
          date: new Date(),
          status: formValue.status,
          nbLikes: 0
        };
        
        this.suggestionService.updateSuggestion(updatedSuggestion).subscribe({
          next: () => {
            this.router.navigate(['/suggestions']);
          },
          error: (err) => {
            console.error('Erreur lors de la mise à jour', err);
          }
        });
      } else {
        // Mode ajout
        const newSuggestion: Suggestion = {
          id: 0, // L'id sera auto-généré par json-server
          title: formValue.title,
          description: formValue.description,
          category: formValue.category,
          date: new Date(),
          status: 'en attente',
          nbLikes: 0
        };

        this.suggestionService.addSuggestion(newSuggestion).subscribe({
          next: () => {
            this.router.navigate(['/suggestions']);
          },
          error: (err) => {
            console.error('Erreur lors de l\'ajout', err);
          }
        });
      }
    }
  }
}
