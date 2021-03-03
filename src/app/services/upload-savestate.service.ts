import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadSavestateService {

  constructor(
    private http: HttpClient
  ) { }

  public async upload(data) {
    // console.log('Service:');
    // console.log(data);
    return await this.http.post(`/api/SaveState-Upload-File`, data).toPromise(); 
  }

  public async uploadMetadata(data) {
    // console.log('Service:');
    // console.log(data);
    return await this.http.post(`/api/SaveState-Upload-File-Metadata`, data).toPromise(); 
  }

  public async updateKey(data) {
    console.log(data);
    return await this.http.post(`/api/Update-Key`, data).toPromise();
  }

}
