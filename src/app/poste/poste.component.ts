import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { finalize } from 'rxjs/operators';
import { Poste, VoteType } from './poste.class';
import { PosteSource } from '../services/poste.source';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorManagerService } from '../services/error-manager.service';
import { ID } from '../common.class';
import { OfflineDBService } from '../services/offline-db.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../common/delete-dialog/delete-dialog.component';
import { merge, concat } from 'rxjs';

@Component({
  selector: 'app-poste',
  templateUrl: './poste.component.html',
  styleUrls: ['./poste.component.scss']
})
export class PosteComponent implements OnInit {

  @Input()
  poste: Poste;

  readonly voteType = VoteType;

  loadingBuff: number;
  userOfflineAccess: boolean;
  userVote: VoteType;


  constructor(
    private deleteDialog: MatDialog,
    private offlineDBService: OfflineDBService,
    private errorManager: ErrorManagerService,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private posteSource: PosteSource
  ) {
    this.loadingBuff = 0;
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        if (params.id) {
          this.updatePoste(params.id);
        } else {
          this.updateUserOfflineAccess();
          this.setUserVote();
        }
      },
      error => {
        this.location.back();
        this.errorManager.showErrorMessage('Impossible de charger le poste.', error);
      }
    );
  }

  updateVote(vote: VoteType): void {
    this.loadingBuff++;
    this.posteSource
      .setPostVoteForUser(this.poste._id, vote)
      .pipe(finalize(() => this.loadingBuff--))
      .subscribe(
        theVote => this.poste.vote = theVote,
        error => this.errorManager.showErrorMessage('Impossible de voter pour ce poste.', error)
      );
  }

  setUserVote(): void {
    this.loadingBuff++;
    this.posteSource
      .getPostVoteForUser(this.poste._id)
      .pipe(finalize(() => this.loadingBuff--))
      .subscribe(
        vote => this.userVote = vote,
        error => this.errorManager.showErrorMessage('Impossible d\'obtenir votre vote voter pour ce poste.', error)
      );
  }

  toggleOfflinePost(): void {
    this.loadingBuff++;
    const willHaveOnlineAccessToPost = !this.userOfflineAccess;

    const updateOfflinePosteList = willHaveOnlineAccessToPost
      ? this.offlineDBService.insertPoste(this.poste)
      : this.offlineDBService.removePoste(this.poste._id);

    updateOfflinePosteList
      .pipe(finalize(() => this.loadingBuff--))
      .subscribe(
        () => this.updateUserOfflineAccess(),
        error => this.errorManager.showErrorMessage('Impossible d\'actualiser le status hors connexion pour ce poste.', error)
      );
  }

  updateUserOfflineAccess(): void {
    this.loadingBuff++;
    this.offlineDBService.isPosteOffline(this.poste._id)
      .pipe(finalize(() => this.loadingBuff--))
      .subscribe(
        posteFound => this.userOfflineAccess = !!posteFound,
        error => this.errorManager.showErrorMessage('Impossible d\'obtenir le status hors connexion pour ce poste.', error)
      );
  }

  updatePoste(id: ID) {
    this.loadingBuff++;
    this.posteSource
      .getPosteById(id)
      .pipe(finalize(() => this.loadingBuff--))
      .subscribe(
        poste => {
          this.poste = poste;
          this.updateUserOfflineAccess();
          this.setUserVote();
        },
        error => {
          if (!this.poste) {
            this.location.back();
            this.errorManager.showErrorMessage('Impossible de trouver un poste avec l\'identifiant demandé', error);
          } else {
            this.errorManager.showErrorMessage('Impossible d\'actualiser le poste.', error);
          }
        }
      );
  }

  openConfirmDeleteDialog(): void {
    const dialogRef = this.deleteDialog.open(DeleteDialogComponent, {
      data: this.poste.title,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadingBuff++;
      if (result === true) {
        merge(
          this.posteSource.deletePoste(this.poste._id),
          this.offlineDBService.removePoste(this.poste._id)
        )
          .pipe(finalize(() => this.loadingBuff--))
          .subscribe(
            () => {
              this.router.navigate(['postes']);
              this.errorManager.showInfoMessage('Poste supprimé avec succès.');
            },
            error => this.errorManager.showErrorMessage('Impossible de supprimer le poste.', error)
          );
      }
    });
  }

}
