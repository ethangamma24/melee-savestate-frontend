import { DataSource } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Observable } from 'rxjs';

import { SearchService } from '../../services/search.service';

import * as characters from '../../shared/characters.json';

declare var require: any;
const FileSaver = require('file-saver');

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class SearchComponent implements AfterViewInit {

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  isExpansionDetailRow = (index, row) => row.hasOwnProperty('detailRow');
  //expandedRow: any;

  character_filter = "";
  opponent_filter = "Any";
  stage_filter = "Any";
  training_type = new FormControl({ value: 'Any' });
  training_type_list: string[] = [
    'Any',
    'Punish',
    'Edgeguard',
    'Spacing',
    'Techchase',
    'Recovery',
    'Out of Shield',
    'Attack on Shield',
    'Defense'
  ];
  version = new FormControl({ value: 'Any' });
  version_list: string[] = [
    'Any',
    'Alpha 1',
    'Alpha 2',
    'Alpha 3',
    'Alpha 6',
    'Alpha 7.2'
  ]

  data_source = new MatTableDataSource();
  columns: any = [
    'username',
    'file_name',
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
  data: any;
  default_search: boolean;
  expandedRow: any;

  temp_data_source = [
    { username: 'thetincan', training_name: 'Fox Stomp Techchase at 50%', character: 'Cf', opponent: 'Fo', stage: 'fd', training_type: 'Techchase', version: 'Alpha 6', downloads: 178 },
    { username: 'thetincan', training_name: 'Fox Edgeguard', character: 'Cf', opponent: 'Fo', stage: 'bf', training_type: 'Edgeguard', version: 'Alpha 3', downloads: 349 },
  ];

  constructor(public search_service: SearchService) {
    this.default_search = true;
  }

  async ngAfterViewInit() {
    this.data = await this.search_service.getFilesByPopularity();
    this.data_source.data = [...this.data];
    setTimeout(() => {
      this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
      this.length = this.temp_data_source.length;
      this.data_source.paginator = this.paginator;
      this.data_source.sort = this.sort;
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

  async search () {
    let filter_attributes = {};
    let filter_attribute_names = {};
    let filter_expression = '';
    let key_expression = '';

    // This is here so that the code knows if it needs to add "and" into the filter expression.
    let multiple_filters = false;

    if (this.character_filter != '') {
      filter_attributes[':char'] = { 'S': this.character_filter };
      filter_attribute_names['#c'] = 'character';
      key_expression += '#c = :char';

      if (this.opponent_filter != 'Any') {
        filter_attributes[':opp'] = { 'S': this.opponent_filter };
        filter_attribute_names['#o'] = 'opponent';
        filter_expression += '#o = :opp';
        multiple_filters = true;
      }

      if (this.stage_filter != 'Any') {
        filter_attributes[':stage'] = { 'S': this.stage_filter };
        filter_attribute_names['#s'] = 'stage';
        if (multiple_filters) {
          filter_expression += ' and #s = :stage';
        } else {
          filter_expression = '#s = :stage';
          multiple_filters = true;
        }
      }

      if (this.version.value != 'Any' && !this.version.value.value) {
        filter_attributes[':ver'] = { 'S': this.version.value };
        filter_attribute_names['#v'] = 'version';
        if (multiple_filters) {
          filter_expression += ' and #v = :ver';
        } else {
          filter_expression = '#v = :ver';
          multiple_filters = true;
        }
      }

      if (this.training_type.value != 'Any' && !this.training_type.value.value) {
        filter_attributes[':tt'] = { 'S': this.training_type.value };
        filter_attribute_names['#t'] = 'training_type';
        if (multiple_filters) {
          filter_expression += ' and #t = :tt';
        } else {
          filter_expression += '#t = :tt';
        }
      }

      this.data = await this.search_service.getFilesByCharacter([key_expression, filter_attributes, filter_attribute_names, filter_expression]);

      this.data_source.data = [...this.data];
      setTimeout(() => {
        this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
        this.length = this.temp_data_source.length;
        this.data_source.paginator = this.paginator;
        this.data_source.sort = this.sort;
        this.data_source.sort.direction = 'desc';
        this.data_source.sort.active = 'downloads';
      }, 10);

      console.log(this.data_source.data);

    }
  }

  async downloadFile(row: any) {
    console.log(row);
    let file: any;
    file = await this.search_service.downloadFile(row.s3_object_location.S || row.s3_object_location);
    console.log(file);
    const blob = new Blob([file]);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = row.file_name.S || row.file_name;

    a.click();

    setTimeout( () => {
      URL.revokeObjectURL(url);
    }, 1000);

  }

}
