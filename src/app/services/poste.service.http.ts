import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, concat, of, forkJoin } from 'rxjs';
import { Poste, PosteLight, CreatePoste, VoteType } from '../poste/poste.class';
import { environment } from './../../environments/environment';
import { PosteSource } from './poste.source';
import { ID } from '../common.class';
import { OfflineDBService } from './offline-db.service';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class PosteServiceHTTP implements PosteSource {

  private href: string = environment.data_href;

  constructor(
    private http: HttpClient,
    private offlineDBService: OfflineDBService,
  ) { }

  getPostes(): Observable<PosteLight[]> {
    return this.http.get<PosteLight[]>(`${this.href}/postes/`);
  }

  addPoste(posteData: CreatePoste): Observable<Poste> {
    posteData.dateCreated = new Date();
    return this.http.post<Poste>(`${this.href}/postes/`, posteData);
  }

  updatePoste(id: ID, posteData: Poste): Observable<Poste> {
    this.offlineDBService.updatePoste(id, posteData).subscribe();
    return this.http.put<Poste>(`${this.href}/postes/${id}`, posteData);
  }

  deletePoste(id: ID): Observable<void> {
    return concat(
      this.offlineDBService.removePoste(id),
      this.http.delete<void>(`${this.href}/postes/${id}`)
    );
  }

  getPosteById(id: ID): Observable<Poste> {
    return this.http.get<Poste>(`${this.href}/postes/${id}`);
  }

  filterPoste(filter: string): Observable<PosteLight[]> {
    const containStr = (field: string) => field.toUpperCase().indexOf(filter.toUpperCase()) >= 0;
    return this.getPostes().pipe(
      mergeMap(postes => of(postes.filter(poste => containStr(poste.title) || containStr(poste.author)))))
  }


  setPostVoteForUser(posteId: ID, vote: number): Observable<number> {
    return forkJoin([
      this.getPosteById(posteId),
      this.getPostVoteForUser(posteId)
    ])
      .pipe(mergeMap(([thePoste, theVote]) => {
        if (thePoste) {
          thePoste.vote += vote - (theVote || 0);
          this.offlineDBService.setVote({ id: posteId, nb: vote });
          return this.updatePoste(posteId, thePoste).pipe(mergeMap(() => of(thePoste.vote)))

        } else {
          return throwError(`Impossible de trouver le poste avec l'id [${posteId}]`);
        }
      }));
  }

  getPostVoteForUser(posteId: ID): Observable<VoteType> {
    return this.offlineDBService.getVote(posteId);
  }

}
