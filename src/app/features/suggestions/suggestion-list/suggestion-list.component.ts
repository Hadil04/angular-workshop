import { Component } from '@angular/core';

@Component({
  selector: 'app-suggestion-list',
  templateUrl: './suggestion-list.component.html',
  styleUrls: ['./suggestion-list.component.css']
})
export class SuggestionListComponent {

  suggestions = [
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
      title: 'Moderniser l’interface utilisateur',
      description: 'Refonte complète de l’interface utilisateur.',
      category: 'Technologie',
      nbLikes: 5,
      status: 'EN_ATTENTE',
      date: '10 Jan 2025'
    }
  ];

  // ✅ AJOUTER CETTE MÉTHODE
  likeSuggestion(s: any) {
    s.nbLikes++;
  }

}
