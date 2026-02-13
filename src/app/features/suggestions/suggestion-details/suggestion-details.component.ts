import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-suggestion-details',
  templateUrl: './suggestion-details.component.html',
  styleUrls: ['./suggestion-details.component.css']
})
export class SuggestionDetailsComponent implements OnInit {

  id!: number;
  suggestion: any;

  suggestions = [
    {
      id: 1,
      title: 'Organiser une journée team building',
      description: 'Suggestion pour renforcer les liens entre les membres.',
      category: 'Événements',
      nbLikes: 10
    },
    {
      id: 2,
      title: 'Améliorer le système de réservation',
      description: 'Proposition pour améliorer la gestion des réservations.',
      category: 'Technologie',
      nbLikes: 3
    },
    {
      id: 3,
      title: 'Moderniser l’interface utilisateur',
      description: 'Refonte complète de l’interface utilisateur.',
      category: 'Technologie',
      nbLikes: 5
    }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.suggestion = this.suggestions.find(
      s => s.id === this.id
    );
  }
}
