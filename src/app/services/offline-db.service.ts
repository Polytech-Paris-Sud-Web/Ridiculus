import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { PosteLight, Poste } from '../poste/poste.class';
import { Observable, of, throwError, from } from 'rxjs';
import { ID } from '../common.class';

@Injectable({
  providedIn: 'root'
})
export class OfflineDBService {

  private posteTable: Dexie.Table<Poste, number>;

  constructor() {
    const db = new Dexie('offlineStorage');
    this.setDatabaseSchemaOverVersions(db);
    this.connectToDatabase(db);
  }

  private setDatabaseSchemaOverVersions(db): void {
    db.version(0.1).stores({
      postes: 'id,name',
    });
  }

  private connectToDatabase(db): void {
    this.posteTable = db.table('postes');
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

  insertPoste(poste: Poste): Observable<number> {
    return from(this.posteTable.add(poste));
  }

  updatePoste(id: ID, poste: Poste): Observable<number> {
    return from(this.posteTable.update(id, poste));
  }

  removePoste(id: ID): Observable<unknown> {
    return from(this.posteTable.delete(id));
  }

  findPosteById(id: ID): Observable<Poste> {
    return from(this.posteTable.get(id));
  }

}
