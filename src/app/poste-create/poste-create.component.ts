import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PosteSource } from '../services/poste.source';
import { CreatePoste } from '../poste/poste.class';
import { Router } from '@angular/router';
import { ErrorManagerService } from '../services/error-manager.service';
import { finalize } from 'rxjs/operators';
import { SynchroDbService } from '../services/synchro-db.service';

@Component({
  selector: 'app-poste-create',
  templateUrl: './poste-create.component.html',
  styleUrls: ['./poste-create.component.scss']
})
export class PosteCreateComponent implements OnInit {

  posteForm: FormGroup;
  loadingBuff: number;

  constructor(
    private synchroDbService: SynchroDbService,
    private errorManager: ErrorManagerService,
    private router: Router,
    private posteSource: PosteSource,
    private fb: FormBuilder
  ) {
    this.posteForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
    this.loadingBuff = 0;
  }

  ngOnInit(): void {
  }

  createPoste(): void {
    this.loadingBuff++;

    const { title, content } = this.posteForm.value;
    const newPoste: CreatePoste = {
      title,
      content,
      author: 'user'
    };

    this.posteSource
      .addPoste(newPoste)
      .pipe(finalize(() => this.loadingBuff--))
      .subscribe(
        poste => this.router.navigate(['postes', poste.id]),
        () => {
          this.errorManager.showInfoMessage('Impossible de sauvgarder le poste en ligne pour le moment, post est enregistré hors ligne');
          this.saveOfflinePost(newPoste);
        }
      );
  }

  createOfflinePoste(): void {
    const { title, content } = this.posteForm.value;
    const newPoste: CreatePoste = {
      title,
      content,
      author: 'user'
    };
    this.saveOfflinePost(newPoste);

  }

  private saveOfflinePost(newPoste: CreatePoste) {
    this.loadingBuff++;
    this.synchroDbService
      .insertNewPoste(newPoste)
      .pipe(finalize(() => this.loadingBuff--))
      .subscribe(
        () => {
          this.router.navigate(['offline-postes']);
        },
        error => this.errorManager.showErrorMessage('Erreur lors de la création du poste.', error)
      );
  }

}
