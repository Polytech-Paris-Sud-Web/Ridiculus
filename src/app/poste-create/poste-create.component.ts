import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PosteSource } from '../services/poste.source';
import { CreatePoste } from '../poste/poste.class';
import { Router } from '@angular/router';
import { ErrorManagerService } from '../services/error-manager.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-poste-create',
  templateUrl: './poste-create.component.html',
  styleUrls: ['./poste-create.component.scss']
})
export class PosteCreateComponent implements OnInit {

  posteForm: FormGroup;
  loadingBuff: number;

  constructor(
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

    let { title, content } = this.posteForm.value;
    let newPoste: CreatePoste = {
      title,
      content,
      author: 'user'
    };

    this.posteSource
      .addPoste(newPoste)
      .pipe(finalize(() => this.loadingBuff--))
      .subscribe(
        poste => this.router.navigate(['postes', poste.id]),
        error => this.errorManager.showErrorMessage('Erreur lors de la création du poste.', error)
      );
  }

}
