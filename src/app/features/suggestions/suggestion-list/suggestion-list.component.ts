import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-suggestion-list',
  templateUrl: './suggestion-list.component.html',
  styleUrls: ['./suggestion-list.component.css']
})
export class SuggestionListComponent implements OnInit {

  suggestions: any[] = [
    {
      id: 1,
      title: 'Organiser une journée team building',
      description: 'Suggestion pour renforcer les liens entre les membres.',
      category: 'Événements',
      nbLikes: 10,
      status: 'ACCEPTEE',
      date: '20 Jan 2025'
    },
    {
      id: 2,
      title: 'Améliorer le système de réservation',
      description: 'Proposition pour améliorer la gestion des réservations.',
      category: 'Technologie',
      nbLikes: 3,
      status: 'REFUSEE',
      date: '15 Jan 2025'
    },
    {
      id: 3,
      title: "Moderniser l'interface utilisateur",
      description: "Refonte complète de l'interface utilisateur.",
      category: 'Technologie',
      nbLikes: 5,
      status: 'EN_ATTENTE',
      date: '10 Jan 2025'
    }
  ];

  ngOnInit(): void {
    // Charger les suggestions depuis localStorage
    const storedSuggestions = localStorage.getItem('suggestions');
    if (storedSuggestions) {
      const newSuggestions = JSON.parse(storedSuggestions);
      // Ajouter les nouvelles suggestions à la liste existante
      this.suggestions = [...this.suggestions, ...newSuggestions];
      // Effacer le localStorage après l'avoir chargé
      localStorage.removeItem('suggestions');
    }
  }

  likeSuggestion(s: any) {
    s.nbLikes++;
  }

}
