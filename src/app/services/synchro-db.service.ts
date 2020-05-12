import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { CreatePoste } from '../poste/poste.class';
import { v4 as uuid } from 'uuid';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SynchroDbService {
  
  newPostesTable: Dexie.Table<CreatePoste, string>;

  constructor() {
    const db = new Dexie('SynchroStorage');
    this.setDatabaseSchemaOverVersions(db);
    this.connectToDatabase(db);
  }

  private setDatabaseSchemaOverVersions(db): void {
    db.version(0.1).stores({
      newPostesBuffer: 'id, title',
    });
  }

  private connectToDatabase(db): void {
    this.newPostesTable = db.table('newPostesBuffer');
  }

  getNewPostes(): Observable<CreatePoste[]> {
    return from(this.newPostesTable.toArray());
  }

  insertNewPoste(poste: CreatePoste): Observable<CreatePoste> {
    poste.id = uuid();
    poste.dateCreated = new Date();
    return from(this.newPostesTable.add(poste).then(() => poste));
  }

  updatePoste(id: string, poste: CreatePoste): Observable<number> {
    poste.dateCreated = new Date();
    return from(this.newPostesTable.update(id, poste));
  }

  removeSavedPostById(id: string) {
    return from(this.newPostesTable.delete(id));
  }

  findPosteById(id: string): Observable<CreatePoste> {
    return from(this.newPostesTable
      .get(id)
      .then(poste => !!poste ? Promise.resolve(poste) : Promise.reject(`Cannot find not syncronised created poste with id ${id}`))
    );
  }



}
