import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Poste, PosteLight, CreatePoste, VoteType } from '../poste/poste.class';
import { environment } from './../../environments/environment';
import { PosteSource } from './poste.source';
import { ID } from '../common.class';

@Injectable()
export class PosteServiceHTTP implements PosteSource {

  private href: string = environment.data_href;

  constructor(private http: HttpClient) { }

  getPostes(): Observable<PosteLight[]> {
    return this.http.get<PosteLight[]>(`${this.href}/postes/`);
  }

  addPoste(posteData: CreatePoste): Observable<Poste> {
    return this.http.post<Poste>(`${this.href}/postes/`, posteData);
  }

  updatePoste(id: ID, posteData: Poste): Observable<Poste> {
    return throwError('Method not implemented.');
  }

  deletePoste(id: ID): Observable<void> {
    return this.http.delete<void>(`${this.href}/postes/${id}`);
  }

  getPosteById(id: ID): Observable<Poste> {
    return this.http.get<Poste>(`${this.href}/postes/${id}`);
  }

  filterPoste(filter: string): Observable<PosteLight[]> {
    return throwError('Method not implemented.');
  }


  setPostVoteForUser(posteId: ID, user: string, vote: number): Observable<number> {
    return throwError('Method not implemented.');
  }

  getPostVoteForUser(posteId: ID, user: string): Observable<VoteType> {
    return throwError('Method not implemented.');
  }

}
