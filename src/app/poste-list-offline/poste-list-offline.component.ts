import { Component, OnInit, ViewChild } from '@angular/core';
import { PosteLight } from '../poste/poste.class';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ErrorManagerService } from '../services/error-manager.service';
import { finalize } from 'rxjs/operators';
import { OfflineDBService } from '../services/offline-db.service';

@Component({
  selector: 'app-poste-list-offline',
  templateUrl: './poste-list-offline.component.html',
  styleUrls: ['./poste-list-offline.component.scss']
})
export class PosteListOfflineComponent implements OnInit {

  posteList: PosteLight[] = [];
  loadingBuff: number;

  displayedColumns: string[] = ['vote', 'title', 'author', 'dateModificator'];
  dataSource: MatTableDataSource<PosteLight>;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private errorManager: ErrorManagerService,
    private posteSource: OfflineDBService,
  ) {
    this.loadingBuff = 0;
    this.refreshPostList();
  }

  refreshPostList(): void {
    this.loadingBuff++;
    this.posteSource.getPostes()
    .pipe(finalize(() => this.loadingBuff--))
    .subscribe(
      postes => {
        this.posteList = postes;
        this.dataSource = new MatTableDataSource<PosteLight>(this.posteList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => this.errorManager.showErrorMessage('Impossible de charger la liste des postes.', error)
    );
  }

  ngOnInit(): void {
  }
}
