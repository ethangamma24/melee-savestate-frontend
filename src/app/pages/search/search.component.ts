import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSort, MatTableDataSource, MatPaginator, PageEvent } from '@angular/material';

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

  constructor() { }

  ngOnInit(): void {
  }

}
