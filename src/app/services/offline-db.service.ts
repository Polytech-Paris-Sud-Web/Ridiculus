import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { PosteLight, Poste } from '../poste/poste.class';
import { Observable, from, of } from 'rxjs';
import { ID, User } from '../common.class';

@Injectable({
  providedIn: 'root'
})
export class OfflineDBService {

  private posteTable: Dexie.Table<Poste, ID>;
  private userTable: Dexie.Table<User, ID>;

  constructor() {
    const db = new Dexie('offlineStorage');
    this.setDatabaseSchemaOverVersions(db);
    this.connectToDatabase(db);
  }

  private setDatabaseSchemaOverVersions(db): void {
    db.version(0.1).stores({
      postes: 'id,title',
      user: 'id,name'
    });
  }

  private connectToDatabase(db): void {
    this.posteTable = db.table('postes');
    this.userTable = db.table('user');
  }

  getPostes(): Observable<PosteLight[]> {
    return from(
      this.posteTable.toArray()
        .then(postes => postes.map(poste => {
          const fullPoste = { ...poste };
          delete fullPoste.content;
          return fullPoste;
        }))
    );
  }

  insertPoste(poste: Poste): Observable<void> {
    return from(this.posteTable.add(poste).then(() => undefined));
  }

  updatePoste(id: ID, poste: PosteLight | Poste): Observable<number> {
    return from(this.posteTable.update(id, poste));
  }

  removePoste(id: ID): Observable<void> {
    return from(this.posteTable.delete(id));
  }

  findPosteById(id: ID): Observable<Poste> {
    return from(this.posteTable
      .get(id)
      .then(poste => !!poste ? Promise.resolve(poste) : Promise.reject(`Cannot find offline poste with id ${id}`))
    );
  }

  isPosteOffline(id: ID): Observable<boolean> {
    return from(this.posteTable.get(id).then((poste) => !!poste));
  }

  setUser(user: User): Observable<void> {
    return from(
      this.userTable.clear()
      .then(() => this.userTable.add(user))
      .then(() => undefined)
    );
  }

  getUser(): Observable<User> {
    return from(this.userTable.toArray()
      .then(user => user[0] ? Promise.resolve(user[0]) : Promise.reject(`No current user found`))
    );
  }

}
