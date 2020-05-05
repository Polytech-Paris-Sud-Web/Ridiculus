import { Observable } from 'rxjs';
import { Poste, CreatePoste, PosteLight } from '../poste/poste.class';

export abstract class PosteSource {

    abstract getPostes(): Observable<PosteLight[]>;

    abstract getPosteById(id: string): Observable<Poste>;

    abstract addPoste(posteData: CreatePoste): Observable<Poste>;

    abstract updatePoste(id: string, posteData: Poste): Observable<Poste>;

    abstract deletePoste(id: string): Observable<void>;


    abstract isPostOfflineForUser(posteId: string, user: string): Observable<boolean>;

    abstract setOfflineStatusPostForUser(posteId: string, user: string, hasAccessOffline: boolean): Observable<void>;
    
    abstract getPostVoteForUser(posteId: string, user: string): Observable<number>;

    abstract setPostVoteForUser(posteId: string, user: string, vote: number): Observable<number>;

}