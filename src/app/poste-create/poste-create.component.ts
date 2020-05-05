import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PosteSource } from '../services/poste.source';
import { CreatePoste } from '../poste/poste.class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poste-create',
  templateUrl: './poste-create.component.html',
  styleUrls: ['./poste-create.component.scss']
})
export class PosteCreateComponent implements OnInit {

  posteForm: FormGroup;
  loadingBuff: number;

  constructor(
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

    this.posteSource.addPoste(newPoste).subscribe(
      (poste) => {
          this.loadingBuff--;
          this.router.navigate(['postes', poste.id]);
      },
      (error) => {
        this.loadingBuff--;
        throw new Error(`Erreur lors de la création du poste. ${error}`);
      }
    );
  }

}
