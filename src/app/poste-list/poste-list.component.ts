import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { PosteLight } from '../poste/poste.class';
import { PosteSource } from '../services/poste.source';

@Component({
  selector: 'app-poste-list',
  templateUrl: './poste-list.component.html',
  styleUrls: ['./poste-list.component.scss']
})
export class PosteListComponent implements OnInit {

  posteList: PosteLight[] = [];
  loadingBuff: number;

  displayedColumns: string[] = ['vote', 'title', 'author', 'dateModificator'];
  dataSource: MatTableDataSource<PosteLight>;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private posteSource: PosteSource) {
    this.loadingBuff = 0;
    this.refreshPostList();
  }

  refreshPostList(): void {
    this.loadingBuff++;
    this.posteSource.getPostes().subscribe(
      (postes) => {
        this.posteList = postes;
        this.dataSource = new MatTableDataSource<PosteLight>(this.posteList);
        this.loadingBuff--;
      },
      (error) => {
        this.loadingBuff--;
        throw new Error(`Impossible de charger la liste des postes. ${error}`);
      }
    );
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
