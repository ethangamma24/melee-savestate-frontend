import { DataSource } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Observable } from 'rxjs';

import * as characters from '../../shared/characters.json';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements AfterViewInit {

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  username: string;
  name = 'Ethan Harmon';

  data_source = new MatTableDataSource();
  columns: any = [
    'training_name',
    'character',
    'opponent',
    'stage',
    'training_type',
    'downloads',
    'download-button'
  ]
  length: any;
  page_size = 25;
  page_size_options: number[] = [10, 25, 50];
  page_event: PageEvent;

  temp_data_source = [
    { training_name: 'Fox Stomp Techchase at 50%', character: 'Cf', opponent: 'Fo', stage: 'fd', training_type: 'Techchase', downloads: 178 },
    { training_name: 'Fox Edgeguard', character: 'Cf', opponent: 'Fo', stage: 'bf', training_type: 'Edgeguard', downloads: 349 },
  ];

  constructor(public route: ActivatedRoute) { }

  ngAfterViewInit(): void {
    this.data_source.data = this.temp_data_source;
    this.route.params.subscribe( (params) => {
      this.username = params['id'];
    });
    setTimeout(() => {
      this.length = 2;
      this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
      this.length = this.temp_data_source.length;
      this.data_source.paginator = this.paginator;
      this.data_source.sort = this.sort;
      this.data_source.sort.direction = 'desc';
      this.data_source.sort.active = 'downloads';
    }, 10);
  }
}
