import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { Poste, PosteLight, CreatePoste, VoteType } from '../poste/poste.class';
import { environment } from './../../environments/environment';
import { PosteSource } from './poste.source';

@Injectable()
export class PosteServiceHTTP implements PosteSource {

  private href: string = environment.data_href;

  constructor(private http : HttpClient) { }

  getPostes(): Observable<PosteLight[]> {
    return this.http.get<PosteLight[]>(`${this.href}/postes/`);
  }

  addPoste(posteData: CreatePoste): Observable<Poste> {
    return this.http.post<Poste>(`${this.href}/postes/`, posteData);
  }

  updatePoste(id: string, posteData: Poste): Observable<Poste> {
    return throwError("Method not implemented.");
  }

  deletePoste(id: string): Observable<void> {
    return this.http.delete<void>(`${this.href}/postes/${id}`);
  }

  getPosteById(id: string): Observable<Poste> {
    return this.http.get<Poste>(`${this.href}/postes/${id}`);
  }

  isPostOfflineForUser(posteId: string, user: string): Observable<boolean> {
    return throwError("Method not implemented.");
  }
  
  setOfflineStatusPostForUser(posteId: string, user: string, hasAccessOffline: boolean): Observable<void> {
    return throwError("Method not implemented.");
  }

  setPostVoteForUser(posteId: string, user: string, vote: number): Observable<number> {
    return throwError("Method not implemented.");
  }

  getPostVoteForUser(posteId: string, user: string): Observable<VoteType> {
    return throwError("Method not implemented.");
  }

}
