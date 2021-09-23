import { Component, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { UploadSavestateService } from '../../services/upload-savestate.service';
import { AccountService } from '../../services/account.service';

import * as characters from '../../shared/characters.json';

@Component({
  selector: 'app-upload-savestate',
  templateUrl: './upload-savestate.component.html',
  styleUrls: ['./upload-savestate.component.scss'],
  animations: [
    trigger('detailExpand', [
      state(
        'void',
        style({ height: '0px', minHeight: '0', visibility: 'hidden' })
      ),
      state('*', style({ height: '*', visibility: 'visibile' })),
      transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UploadSavestateComponent implements OnInit {
  not_logged_in = false;
  description = '';
  file: any;
  file_name = '';
  character = '';
  opponent = '';
  stage = '';
  title = '';
  training_type = new FormControl();
  training_type_list: string[] = [
    'Punish',
    'Edgeguard',
    'Spacing',
    'Techchase',
    'Recovery',
    'Out of Shield',
    'Attack on Shield',
    'Defense',
  ];
  version = new FormControl();
  version_list: string[] = [
    'Alpha 1',
    'Alpha 2',
    'Alpha 3',
    'Alpha 6',
    'Alpha 7.2',
  ];

  upload_successful = false;
  upload_unsuccessful = false;

  constructor(
    private http: HttpClient,
    public upload_savestate_service: UploadSavestateService,
    public account_service: AccountService
  ) {}

  ngOnInit(): void {}

  fileUploaded(event) {
    const file_uploaded: File = event.target.files[0];

    if (file_uploaded.name.toString().substr(-4, 4) !== '.gci') {
      this.file_name = 'Please upload a .gci file.';
    } else if (file_uploaded) {
      this.file_name = file_uploaded.name;
      this.file = file_uploaded;
    }
  }

  changeFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsBinaryString(this.file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  async upload() {
    let user = await this.account_service.checkToken();
    if (user == null) {
      this.not_logged_in = true;
    } else {
      let form_data = new FormData();
      let now = new Date();
      let s3_location =
        now.getMonth() +
        1 +
        '/' +
        now.getFullYear().toString() +
        '/' +
        user +
        now.getHours().toString() +
        now.getMinutes().toString() +
        now.getSeconds().toString();
      let data = {
        username: user,
        description: this.description,
        file_name: this.file_name,
        character: this.character,
        opponent: this.opponent,
        stage: this.stage,
        title: this.title,
        training_type: this.training_type.value,
        version: this.version.value,
        s3_location: s3_location,
        downloads: 0,
      };
      form_data.append('file', this.file);
      form_data.append('file_name', s3_location);

      let key_updated = await this.upload_savestate_service.updateKey(data);

      let success = await this.upload_savestate_service.upload(form_data);

      if (success) {
        this.upload_successful = true;
        await this.upload_savestate_service.uploadMetadata(data);
      } else {
        this.upload_unsuccessful = true;
      }
    }
  }
}
