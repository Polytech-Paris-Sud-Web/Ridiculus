import { Component, OnInit, ViewChild } from '@angular/core';
import { PosteLight, CreatePoste } from '../poste/poste.class';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ErrorManagerService } from '../services/error-manager.service';
import { finalize } from 'rxjs/operators';
import { OfflineDBService } from '../services/offline-db.service';
import { SynchroDbService } from '../services/synchro-db.service';

@Component({
  selector: 'app-poste-list-offline',
  templateUrl: './poste-list-offline.component.html',
  styleUrls: ['./poste-list-offline.component.scss']
})
export class PosteListOfflineComponent implements OnInit {

  posteList: PosteLight[] = [];
  createPosteListe: CreatePoste[] = [];
  loadingBuff: number;

  posteColumns: string[] = ['vote', 'title', 'author', 'dateModificator'];
  createdPosteColumns: string[] = ['title', 'dateModificator','editAction','publishAction','deleteAction'];
  dataSourceOfflinePostes: MatTableDataSource<PosteLight>;
  dataSourceCreatedPostes: MatTableDataSource<CreatePoste>;

  @ViewChild('sortPoste') sortPoste: MatSort;
  @ViewChild('pagePoste') paginatorPoste: MatPaginator;

  @ViewChild('sortCreated') sortCreated: MatSort;
  @ViewChild('pageCreated') paginatorCreated: MatPaginator;

  constructor(
    private synchroDbService: SynchroDbService,
    private errorManager: ErrorManagerService,
    private posteSource: OfflineDBService,
  ) {
    this.loadingBuff = 0;
    this.refreshPostList();
    this.refreshCreatedPosteListe();
  }

  refreshPostList(): void {
    this.loadingBuff++;
    this.posteSource.getPostes()
    .pipe(finalize(() => this.loadingBuff--))
    .subscribe(
      postes => {
        this.posteList = postes;
        this.dataSourceOfflinePostes = new MatTableDataSource<PosteLight>(this.posteList);
        this.dataSourceOfflinePostes.paginator = this.paginatorPoste;
        this.dataSourceOfflinePostes.sort = this.sortPoste;
      },
      error => this.errorManager.showErrorMessage('Impossible de charger la liste des postes.', error)
    );
  }

  refreshCreatedPosteListe(): void {
    this.loadingBuff++;
    this.synchroDbService.getNewPostes()
    .pipe(finalize(() => this.loadingBuff--))
    .subscribe(
      postes => {
        this.createPosteListe = postes;
        this.dataSourceCreatedPostes = new MatTableDataSource<CreatePoste>(this.createPosteListe);
        this.dataSourceCreatedPostes.paginator = this.paginatorCreated;
        this.dataSourceCreatedPostes.sort = this.sortCreated;
      },
      error => this.errorManager.showErrorMessage('Impossible de charger la liste des postes.', error)
    );
  }

  ngOnInit(): void {
  }
}
