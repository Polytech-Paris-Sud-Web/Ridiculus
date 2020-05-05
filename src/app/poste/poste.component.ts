import { Component, OnInit, Input } from '@angular/core';
import { Poste, VoteType } from './poste.class';
import { PosteSource } from '../services/poste.source';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorManagerService } from '../services/error-manager.service';

@Component({
  selector: 'app-poste',
  templateUrl: './poste.component.html',
  styleUrls: ['./poste.component.scss']
})
export class PosteComponent implements OnInit {

  @Input('poste')
  poste: Poste;

  readonly voteType = VoteType;

  loadingBuff: number;
  userOfflineAccess: boolean;
  userVote: VoteType;


  constructor(
    private errorManager: ErrorManagerService,
    private router: Router,
    private route: ActivatedRoute,
    private posteSource: PosteSource
  ) {
    this.loadingBuff = 0;
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        if ("id" in params) {
          this.updatePoste(params.id);
        } else {
          this.updateUserOfflineAccess();
          this.setUserVote();
        }
      },
      (error) => { 
        this.router.navigate(['/postes']);
        this.errorManager.showErrorMessage('Impossible de charger le poste.', error); 
      }
    );
  }

  updateVote(vote: VoteType): void {
    this.loadingBuff++;
    this.posteSource.setPostVoteForUser(this.poste.id, 'user', vote).subscribe(
      (vote) => {
        this.poste.vote = vote;
        this.loadingBuff--;
      },
      (error) => {
        this.loadingBuff--;
        this.errorManager.showErrorMessage('Impossible de voter pour ce poste.', error);
      }
    );
  }

  setUserVote(): void {
    this.loadingBuff++;
    this.posteSource.getPostVoteForUser(this.poste.id, 'user').subscribe(
      (vote) => {
        this.userVote = vote;
        this.loadingBuff--;
      },
      (error) => {
        this.loadingBuff--;
        this.errorManager.showErrorMessage('Impossible d\'obtenir votre vote voter pour ce poste.', error);
      }
    );
  }

  toggleOfflinePost(): void {
    this.loadingBuff++;
    this.posteSource.setOfflineStatusPostForUser(
      this.poste.id,
      'user',
      !this.userOfflineAccess
    ).subscribe(
      () => {
        this.updateUserOfflineAccess();
        this.loadingBuff--;
      },
      (error) => { 
        this.loadingBuff--;
        this.errorManager.showErrorMessage('Impossible d\'actualiser le status hors connexion pour ce poste.', error);
      }
    );
  }

  updateUserOfflineAccess(): void {
    this.loadingBuff++;
    this.posteSource.isPostOfflineForUser(this.poste.id, 'user').subscribe(
      (hasAcces) => {
        this.userOfflineAccess = hasAcces;
        this.loadingBuff--;
      },
      (error) => { 
        this.loadingBuff--;
        this.errorManager.showErrorMessage('Impossible d\'obtenir le status hors connexion pour ce poste.', error);
      }
    );
  }

  updatePoste(id: string) {
    this.loadingBuff++;
    this.posteSource.getPosteById(id).subscribe(
      (poste) => {
        this.poste = poste;
        this.updateUserOfflineAccess();
        this.setUserVote();
        this.loadingBuff--;
      },
      (error) => {
        this.loadingBuff--;
        if(!this.poste){
          this.router.navigate(['/postes']);
          this.errorManager.showErrorMessage('Impossible de trouver un poste avec l\'identifiant demandé', error);
        } else {
          this.errorManager.showErrorMessage('Impossible d\'actualiser le poste.', error);
        }
      }
    )
  }

}
