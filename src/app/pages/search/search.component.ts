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
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements AfterViewInit {

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  character_filter = "";
  opponent_filter = "Any";
  stage_filter = "Any";
  training_types = new FormControl();
  training_type_list: string[] = [
    'Punish',
    'Edgeguard',
    'Spacing',
    'Techchase',
    'Recovery',
    'Out of Shield',
    'Attack on Shield',
    'Defense'
  ];
  versions = new FormControl();
  version_list: string[] = [
    'Alpha 1',
    'Alpha 2',
    'Alpha 3',
    'Alpha 6',
    'Alpha 7.2'
  ]

  data_source = new MatTableDataSource();
  columns: any = [
    'username',
    'training_name',
    'character',
    'opponent',
    'stage',
    'training_type',
    'version',
    'downloads',
    'download-button'
  ]
  length: any;
  page_size = 25;
  page_size_options: number[] = [10, 25, 50];
  page_event: PageEvent;

  temp_data_source = [
    { username: 'thetincan', training_name: 'Fox Stomp Techchase at 50%', character: 'Cf', opponent: 'Fo', stage: 'fd', training_type: 'Techchase', version: 'Alpha 6', downloads: 178 },
    { username: 'thetincan', training_name: 'Fox Edgeguard', character: 'Cf', opponent: 'Fo', stage: 'bf', training_type: 'Edgeguard', version: 'Alpha 3', downloads: 349 },
  ];

  constructor() { }

  ngAfterViewInit(): void {
    this.data_source.data = this.temp_data_source;
    setTimeout(() => {
      console.log(characters);
      console.log(this.sort);
      this.length = 2;
      this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
      this.length = this.temp_data_source.length;
      this.data_source.paginator = this.paginator;
      this.data_source.sort = this.sort;
      console.log(this.data_source.sort)
      this.data_source.sort.direction = 'desc';
      this.data_source.sort.active = 'downloads';
    }, 10);

  }

  applyFilter(filter_value: string) {
    this.data_source.filter = filter_value.trim().toLowerCase();

    if(this.data_source.paginator) {
      this.data_source.paginator.firstPage();
    }
  }

  search () {
    console.log('searching')
  }

}
