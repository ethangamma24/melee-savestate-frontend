import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

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
  // columns: any = {
  //   'training_name',
  //   'character',
  //   'opponent',
  //   'stage',
  //   'training_type',
  //   'downloads'
  // }
  //
  // data_source = [
  //   { training_name: 'Fox Stomp Techchase at 50%', character: 'Cf', opponent: 'Fo', stage: 'FD', training_type: 'Techchase', downloads: 178 },
  //   { training_name: 'Fox Edgeguard', character: 'Cf', opponent: 'Fo', stage: 'Bf', training_type: 'Edgeguard', downloads: 349 },
  // ];

  constructor() { }

  ngOnInit(): void {

  }

}
