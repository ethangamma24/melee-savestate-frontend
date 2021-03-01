import { DataSource } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Observable } from 'rxjs';

import { ProfileService } from '../../services/profile.service';
import { SearchService } from '../../services/search.service';

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

  constructor(
    public route: ActivatedRoute,
    public profile_service: ProfileService,
    public search_service: SearchService
  ) { }

  async ngAfterViewInit() {
    let data: any;
    console.log(data);
    this.data_source.data = [...data];
    this.route.params.subscribe( (params) => {
      this.username = params['id'];
      data = await this.profile_service.getFilesByUser(this.username);
    });
    setTimeout(() => {
      this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
      this.length = this.temp_data_source.length;
      this.data_source.paginator = this.paginator;
      this.data_source.sort = this.sort;
      this.data_source.sort.direction = 'desc';
      this.data_source.sort.active = 'downloads';
    }, 10);
  }

  async downloadFile(row: any) {
    console.log(row);
    let data: any;
    data = await this.search_service.downloadFile(row.s3_object_location);
    console.log(data);
    const blob = new Blob([data]);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = row.file_name;

    a.click();

    setTimeout( () => {
      URL.revokeObjectURL(url);
    }, 1000);
    
  }

}
