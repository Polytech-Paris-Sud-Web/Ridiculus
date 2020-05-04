import { Component, OnInit, Input } from '@angular/core';
import { Poste } from './post.class';

@Component({
  selector: 'app-poste',
  templateUrl: './poste.component.html',
  styleUrls: ['./poste.component.scss']
})
export class PosteComponent implements OnInit {

  @Input('poste')
  poste: Poste;

  constructor() { }

  ngOnInit(): void {
  }

}
