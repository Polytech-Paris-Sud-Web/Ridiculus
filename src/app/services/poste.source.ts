import { Observable } from 'rxjs';
import { Poste, CreatePoste, PosteLight, VoteType } from '../poste/poste.class';
import { ID } from '../common.class';

export abstract class PosteSource {

    abstract getPostes(): Observable<PosteLight[]>;

    abstract getPosteById(id: ID): Observable<Poste>;

    abstract addPoste(posteData: CreatePoste): Observable<Poste>;

    abstract updatePoste(id: ID, posteData: Poste): Observable<Poste>;

    abstract deletePoste(id: ID): Observable<void>;

    abstract filterPoste(filter: string): Observable<PosteLight[]>;


    abstract getPostVoteForUser(posteId: ID): Observable<VoteType>;

    abstract setPostVoteForUser(posteId: ID, vote: number): Observable<number>;

}
