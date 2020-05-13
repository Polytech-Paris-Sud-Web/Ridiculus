import { Injectable } from '@angular/core';
import { User } from '../common.class';
import { Observable, of } from 'rxjs';
import { OfflineDBService } from './offline-db.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private offlineDBService: OfflineDBService
  ) { }

  getCurrentUser(): Observable<User> {
    return this.offlineDBService.getUser()
  }

  setCurrentUser(user: User): Observable<void> {
    return this.offlineDBService.setUser(user);
  }

  askForUserId(username: string): Observable<User> {
    return of({
      _id: Math.random().toString(),
      name: "username"
    });
  }
}
