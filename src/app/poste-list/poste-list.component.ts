import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { PosteLight } from '../poste/poste.class';
import { PosteSource } from '../services/poste.source';
import { ErrorManagerService } from '../services/error-manager.service';
import { finalize } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-poste-list',
  templateUrl: './poste-list.component.html',
  styleUrls: ['./poste-list.component.scss']
})
export class PosteListComponent implements OnInit {

  filterForm: FormGroup;

  posteList: PosteLight[] = [];
  loadingBuff: number;

  displayedColumns: string[] = ['vote', 'title', 'author', 'dateModificator'];
  dataSource: MatTableDataSource<PosteLight>;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private errorManager: ErrorManagerService,
    private posteSource: PosteSource
  ) {
    this.filterForm = this.fb.group({
      filter: ['']
    })
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

  search({ filter: criteria }: { filter: string }): void {
    this.loadingBuff++;
    this.posteSource
      .filterPoste(criteria)
      .pipe(finalize(() => this.loadingBuff--))
      .subscribe(
        postes => {
          this.posteList = postes;
          this.dataSource = new MatTableDataSource<PosteLight>(this.posteList); 
        },
        error => this.errorManager.showErrorMessage('Impossible d\'effectuter cette recherche', error)
      );
  }

}
