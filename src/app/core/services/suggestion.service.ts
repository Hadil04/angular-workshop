import { Injectable } from '@angular/core';
import { Suggestion } from '../../models/suggestion';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {
  // URL du backend (commenté pour test local)
  // suggestionUrl = 'http://localhost:3000/suggestions';

  // Données locales pour test sans backend
  private localSuggestions: Suggestion[] = [
    {
      id: 1,
      title: 'Organiser une journée team building',
      description: 'Suggestion pour organiser une journée de team building afin de renforcer les liens entre les membres de l équipe.',
      category: 'Événements',
      date: new Date('2025-01-20'),
      status: 'acceptee',
      nbLikes: 10
    },
    {
      id: 2,
      title: 'Améliorer le système de réservation',
      description: 'Proposition pour améliorer la gestion des réservations en ligne avec un système de confirmation automatique.',
      category: 'Technologie',
      date: new Date('2025-01-15'),
      status: 'refusee',
      nbLikes: 5
    },
    {
      id: 3,
      title: 'Créer un système de récompenses',
      description: 'Mise en place d un programme de récompenses pour motiver les employés et reconnaître leurs efforts.',
      category: 'Ressources Humaines',
      date: new Date('2025-01-25'),
      status: 'refusee',
      nbLikes: 0
    },
    {
      id: 4,
      title: 'Moderniser l interface utilisateur',
      description: 'Refonte complète de l interface utilisateur pour une meilleure expérience utilisateur avec des fonctionnalités avancées.',
      category: 'Technologie',
      date: new Date('2025-01-30'),
      status: 'en_attente',
      nbLikes: 3
    }
  ];

  private suggestionsSubject = new BehaviorSubject<Suggestion[]>(this.localSuggestions);
  private nextId = 5;

  constructor(private http: HttpClient) { }

  // Méthode pour retourner la liste des suggestions (GET)
  getSuggestionsList(): Observable<Suggestion[]> {
    // Simulation avec données locales
    return of([...this.localSuggestions]).pipe(delay(300));
  }

  // Méthode pour retourner une suggestion par son id (GET)
  getSuggestionById(id: number): Observable<Suggestion> {
    const suggestion = this.localSuggestions.find(s => s.id === id);
    return of(suggestion!).pipe(delay(300));
  }

  // Méthode pour ajouter une nouvelle suggestion (POST)
  addSuggestion(suggestion: Suggestion): Observable<Suggestion> {
    const newSuggestion = { ...suggestion, id: this.nextId++ };
    this.localSuggestions.push(newSuggestion);
    return of(newSuggestion).pipe(delay(300));
  }

  // Méthode pour supprimer une suggestion (DELETE)
  deleteSuggestion(id: number): Observable<void> {
    this.localSuggestions = this.localSuggestions.filter(s => s.id !== id);
    return of(void 0).pipe(delay(300));
  }

  // Méthode pour mettre à jour une suggestion (PUT)
  updateSuggestion(suggestion: Suggestion): Observable<Suggestion> {
    const index = this.localSuggestions.findIndex(s => s.id === suggestion.id);
    if (index !== -1) {
      this.localSuggestions[index] = suggestion;
    }
    return of(suggestion).pipe(delay(300));
  }

  // Méthode pour incrémenter le nombre de likes (PATCH)
  updateNbLikes(id: number): Observable<Suggestion> {
    const suggestion = this.localSuggestions.find(s => s.id === id);
    if (suggestion) {
      suggestion.nbLikes += 1;
      return of(suggestion).pipe(delay(300));
    }
    return of(suggestion!);
  }
}
