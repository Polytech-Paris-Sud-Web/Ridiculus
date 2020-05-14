import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { finalize } from 'rxjs/operators';
import { Poste, VoteType } from '../poste/poste.class';
import { PosteSource } from '../services/poste.source';
import { ActivatedRoute } from '@angular/router';
import { ErrorManagerService } from '../services/error-manager.service';
import { ID } from '../common.class';

@Component({
  selector: 'app-poste',
  templateUrl: './poste-modify.component.html',
  styleUrls: ['./poste-modify.component.scss']
})
export class PosteModifyComponent implements OnInit {

  @Input()
  poste: Poste;

  readonly voteType = VoteType;

  loadingBuff: number;
  posteForm: FormGroup;    
 
  constructor(
    private errorManager: ErrorManagerService,
    private posteSource: PosteSource,
    private fb: FormBuilder,
    private location: Location,
    private route: ActivatedRoute,
  ) {
    
    this.loadingBuff = 0;
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        if (!isNaN(params.id)) {
          this.updatePoste(params.id);
          this.posteForm = this.fb.group({
            title: [this.poste.title, Validators.required],
            content: [this.poste.content, Validators.required]
          });
        }
      },
      error => {
        this.location.back();
        this.errorManager.showErrorMessage('Impossible de charger le poste.', error);
      }
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

  modify(){

    this.loadingBuff++;

    const { title, content } = this.posteForm.value;

    this.modifyPoste(this.poste._id, title, content);
    this.loadingBuff--;
    this.location.back();
  }

  modifyPoste(id: ID, titre: string, contenue: string) {
    this.loadingBuff++;
    this.posteSource
      .getPosteById(id)
      .pipe(finalize(() => this.loadingBuff--))
      .subscribe(
        poste => {
          this.poste = poste;
          this.poste.title = titre;
          this.poste.content = contenue;
          this.poste.dateUpdated = new Date()
        },
        error => {
          if (!this.poste) {
            this.errorManager.showErrorMessage('Impossible de trouver un poste avec l\'identifiant demandé', error);
          } else {
            this.errorManager.showErrorMessage('Impossible d\'actualiser le poste.', error);
          }
        }
      );
  }

}
