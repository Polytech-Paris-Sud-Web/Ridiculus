import { Observable } from 'rxjs';
import { Poste, CreatePoste, PosteLight, VoteType } from '../poste/poste.class';
import { ID } from '../common.class';

export abstract class PosteSource {

    abstract getPostes(): Observable<PosteLight[]>;

    abstract getPosteById(id: ID): Observable<Poste>;

    abstract addPoste(posteData: CreatePoste): Observable<Poste>;

    abstract updatePoste(id: ID, posteData: Poste): Observable<Poste>;

    abstract deletePoste(id: ID): Observable<void>;


    abstract getPostVoteForUser(posteId: ID, user: string): Observable<VoteType>;

    abstract setPostVoteForUser(posteId: ID, user: string, vote: number): Observable<number>;

}
