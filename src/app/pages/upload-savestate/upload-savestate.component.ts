import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';

import * as characters from '../../shared/characters.json';

@Component({
  selector: 'app-upload-savestate',
  templateUrl: './upload-savestate.component.html',
  styleUrls: ['./upload-savestate.component.scss']
})
export class UploadSavestateComponent implements OnInit {

  file: any;
  file_name = '';
  character = '';
  opponent = '';
  stage = '';
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
  ]
  versions = new FormControl();
  version_list: string[] = [
    'Alpha 1',
    'Alpha 2',
    'Alpha 3',
    'Alpha 6',
    'Alpha 7.2'
  ]

  upload_successful = false;
  upload_unsuccessful = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  fileUploaded(event) {
    const file_uploaded: File = event.target.files[0];

    if (file_uploaded.name.toString().substr(-4,4) !== '.gci') {
      this.file_name = 'Please upload a .gci file.';
    } else if (file_uploaded) {
       this.file_name = file_uploaded.name;
       const form_data = new FormData();
       form_data.append("savestate", file_uploaded);
       this.file = form_data;
    }

  }

  async upload() {
    // let successful = await this.upload.uploadSavestateFileToS3();
    let successful = false;
    if (successful) { 
      this.upload_successful = true;
      // this.upload.uploadSavestateMetadataToDynamo();
    } else { 
      this.upload_unsuccessful = true; 
    }
  }

}
