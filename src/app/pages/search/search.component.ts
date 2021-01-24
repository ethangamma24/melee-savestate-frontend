import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  character = "";
  opponent = "Any";
  stage = "Any";
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
