import { Component, OnInit, Input } from '@angular/core';
import { Poste } from './poste.class';
import { PosteSource } from '../services/poste.source';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-poste',
  templateUrl: './poste.component.html',
  styleUrls: ['./poste.component.scss']
})
export class PosteComponent implements OnInit {

  @Input('poste')
  poste: Poste;

  userOfflineAccess: boolean;
  userVote: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private posteSource: PosteSource
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        if ("id" in params) {
          this.updatePoste(params.id);
        } else {
          // poste already here
        }
      },
      (error) => { throw new Error(`Impossible de charger le poste. ${error}`) }
    );
  }

  updateVote(vote: number): void {
    this.posteSource.setPostVoteForUser(this.poste.id, 'user', vote).subscribe(
      (vote) => this.poste.vote = vote,
      (error) =>　{ throw new Error(`Impossible de voter pour ce poste. ${error}`) }
    );
  }

  setUserVote(): void {
    this.posteSource.getPostVoteForUser(this.poste.id, 'user').subscribe(
      (vote) => this.userVote = vote,
      (error) =>　{ throw new Error(`Impossible d'obtenir le vote de l'utilisateur voter pour ce poste. ${error}`) }
    );
  }

  toggleOfflinePost(): void {
    this.posteSource.setOfflineStatusPostForUser(
      this.poste.id,
      'user',
      !this.userOfflineAccess
    ).subscribe(
      () => this.updateUserOfflineAccess(),
      (error) => { throw new Error(`Impossible d'actualiser le status hors connexion pour ce poste. ${error}`) }
    );
  }

  updateUserOfflineAccess(): void {
    this.posteSource.isPostOfflineForUser(this.poste.id, 'user').subscribe(
      (hasAcces) => this.userOfflineAccess = hasAcces,
      (error) => { throw new Error(`Impossible d'obtenir le status hors connexion pour ce poste. ${error}`) }
    );
  }

  updatePoste(id: string) {
    this.posteSource.getPosteById(id).subscribe(
      (poste) => {
        this.poste = poste;
        this.updateUserOfflineAccess();
        this.setUserVote();
      },
      (error) => {
        throw new Error(`Impossible d'actualiser le poste. ${error}`);
      }
    )
  }

}
