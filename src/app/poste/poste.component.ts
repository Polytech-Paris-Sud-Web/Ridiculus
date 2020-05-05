import { Component, OnInit, Input } from '@angular/core';
import { Poste } from './poste.class';

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

  constructor() { }

  ngOnInit(): void {
    // TODO update with service;
    this.userOfflineAccess = true;
    this.userVote = 0;
  }

  changeVote(vote: number): void{
    // TODO use service
    this.poste.vote += vote - this.userVote;
    this.userVote = vote;
  }

  toggleOfflinePost(): void {
    
    this.userOfflineAccess = !this.userOfflineAccess;

    if(this.userOfflineAccess) {
      this.addOfflinePost();
    } else {
      this.removeOfflinePost();
    }
  }

  addOfflinePost(): void {
    // TODO
    throw new Error("Method not implemented.");
  }

  removeOfflinePost(): void {
    // TODO
    throw new Error("Method not implemented.");
  }

}
