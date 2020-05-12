import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { CreatePoste } from '../poste/poste.class';
import { v4 as uuid } from 'uuid';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SynchroDbService {
  
  newPostesTable: Dexie.Table<CreatePoste, uuid>;

  constructor() {
    const db = new Dexie('offlineStorage');
    this.setDatabaseSchemaOverVersions(db);
    this.connectToDatabase(db);
  }

  private setDatabaseSchemaOverVersions(db): void {
    db.version(0.1).stores({
      newPostesBuffer: 'stackOrder, title',
    });
  }

  private connectToDatabase(db): void {
    this.newPostesTable = db.table('newPostesBuffer');
  }

  getNewPostes(): Observable<CreatePoste[]> {
    return from(this.newPostesTable.toArray());
  }

  insertNewPoste(poste: CreatePoste): Observable<void> {
    poste.id = uuid();
    return from(this.newPostesTable.add(poste).then(() => undefined));
  }

  updatePoste(id: uuid, poste: CreatePoste): Observable<number> {
    return from(this.newPostesTable.update(id, poste));
  }

  removeSavedPostById(id: uuid) {
    return from(this.newPostesTable.delete(id));
  }

  findPosteById(id: uuid): Observable<CreatePoste> {
    return from(this.newPostesTable
      .get(id)
      .then(poste => !!poste ? Promise.resolve(poste) : Promise.reject(`Cannot find not syncronised created poste with id ${id}`))
    );
  }



}
